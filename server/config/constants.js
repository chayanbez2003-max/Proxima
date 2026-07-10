/**
 * constants.js
 * Application-wide constants.
 * Add new constants here instead of scattering magic values across the codebase.
 */

export const PROCESSING_STATUS = {
  PENDING:    "pending",
  PROCESSING: "processing",
  COMPLETED:  "completed",
  FAILED:     "failed",
};

export const ANALYSIS_STATUS = {
  UPLOADED:     "uploaded",    // File received, not yet parsed
  PARSED:       "parsed",      // Text extracted (Milestone 2)
  ANALYZED:     "analyzed",    // Skills matched (Milestone 3)
  RECOMMENDED:  "recommended", // Recommendations generated (Milestone 4)
};

export const ALLOWED_MIME_TYPES = ["application/pdf"];

export const MAX_FILE_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || "5", 10);
