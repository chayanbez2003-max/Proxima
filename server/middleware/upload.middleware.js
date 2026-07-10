import upload from "../config/multerConfig.js";
import { ApiError } from "../utils/ApiError.js";
import { ALLOWED_MIME_TYPES } from "../config/constants.js";

/**
 * uploadResumeMiddleware
 *
 * Two-layer validation:
 *  1. Multer handles disk storage + first-pass MIME check (fileFilter in config)
 *  2. This middleware performs a second explicit check on req.file.mimetype
 *     as a defence-in-depth measure against spoofed Content-Type headers.
 *
 * Attaches the uploaded file object to req.file for downstream handlers.
 */
const uploadResumeMiddleware = (req, res, next) => {
  // "resume" must match the FormData field name used by the frontend
  const multerSingle = upload.single("resume");

  multerSingle(req, res, (err) => {
    // ── Multer-specific errors ──────────────────────────
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        const max = process.env.MAX_FILE_SIZE_MB || 5;
        return next(new ApiError(400, `File size exceeds the ${max}MB limit.`));
      }
      // ApiError thrown by fileFilter or other multer errors
      return next(err instanceof ApiError ? err : new ApiError(400, err.message));
    }

    // ── No file attached ───────────────────────────────
    if (!req.file) {
      return next(new ApiError(400, "No file uploaded. Please attach a PDF resume."));
    }

    // ── Second-pass MIME validation ─────────────────────
    if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
      return next(new ApiError(400, "Invalid file type. Only PDF files are accepted."));
    }

    next();
  });
};

export { uploadResumeMiddleware };
