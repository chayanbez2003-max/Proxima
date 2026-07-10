import { ApiError } from "../utils/ApiError.js";

/**
 * globalErrorHandler
 *
 * Centralized Express error-handling middleware.
 * Must be registered LAST (after all routes) in app.js.
 *
 * Handles:
 *  - ApiError instances (operational, expected errors)
 *  - Mongoose CastError (invalid ObjectId)
 *  - Mongoose ValidationError
 *  - Multer errors (bubbled up from uploadMiddleware)
 *  - Generic / unexpected errors
 */
const globalErrorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message    = err.message    || "Internal Server Error";
  let errors     = err.errors     || [];

  // ── Mongoose: invalid ObjectId ─────────────────────
  if (err.name === "CastError") {
    statusCode = 400;
    message    = `Invalid value for field: ${err.path}`;
  }

  // ── Mongoose: validation failed ────────────────────
  if (err.name === "ValidationError") {
    statusCode = 422;
    message    = "Validation failed";
    errors     = Object.values(err.errors).map((e) => e.message);
  }

  // ── Mongoose: duplicate key ─────────────────────────
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message     = `Duplicate value for: ${field}`;
  }

  // Log unexpected server errors
  if (statusCode >= 500) {
    console.error("[ERROR]", err);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export { globalErrorHandler };
