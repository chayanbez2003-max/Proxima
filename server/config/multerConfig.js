import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { ApiError } from "../utils/ApiError.js";

// Resolve __dirname in ES Module context
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ─── Storage ──────────────────────────────────────────────
// Files land in server/uploads/temp/
// They are cleaned up by the service layer after processing.
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../uploads/temp"));
  },
  filename: (_req, file, cb) => {
    // Collision-safe: timestamp + random suffix + original extension
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const ext          = path.extname(file.originalname);
    cb(null, `resume-${uniqueSuffix}${ext}`);
  },
});

// ─── File filter ──────────────────────────────────────────
// Only PDF files are accepted at the Multer layer.
// The middleware adds an additional MIME check for defence-in-depth.
const fileFilter = (_req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only PDF files are accepted."), false);
  }
};

// ─── Max file size ─────────────────────────────────────────
const MAX_MB   = parseInt(process.env.MAX_FILE_SIZE_MB || "5", 10);
const MAX_SIZE = MAX_MB * 1024 * 1024;

// ─── Multer instance ───────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE },
});

export default upload;
