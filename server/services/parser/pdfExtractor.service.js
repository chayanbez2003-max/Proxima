import fs from "fs";
import { createRequire } from "module";
import { ApiError } from "../../utils/ApiError.js";

// pdf-parse v2.x is a CommonJS package with a class-based API.
// createRequire is the correct bridge from ESM → CJS.
const require = createRequire(import.meta.url);
const { PDFParse, VerbosityLevel } = require("pdf-parse");

/**
 * extractTextFromPDF
 *
 * Reads a PDF file from disk and returns the plain text content.
 *
 * Uses the pdf-parse v2.x class API:
 *   new PDFParse(opts) → .load(buffer) → .getText()
 *
 * This service is intentionally single-responsibility:
 *  - It knows about pdf-parse.
 *  - It knows nothing about regex, skills, or MongoDB.
 *  - The resumeParser service calls this and uses the returned text.
 *
 * Error handling:
 *  - File not found       → 400 ApiError
 *  - Read failure         → 500 ApiError
 *  - Corrupted / locked   → 400 ApiError
 *  - No extractable text  → 422 ApiError
 *
 * @param {string} filePath - Absolute path to the uploaded PDF
 * @returns {Promise<string>} Normalised plain text
 */
const extractTextFromPDF = async (filePath) => {
  // ── Guard: file must exist on disk ─────────────────────────────────────────
  if (!fs.existsSync(filePath)) {
    throw new ApiError(400, "Uploaded file not found. Please try uploading again.");
  }

  // ── Read into buffer ────────────────────────────────────────────────────────
  let dataBuffer;
  try {
    dataBuffer = fs.readFileSync(filePath);
  } catch (err) {
    throw new ApiError(500, `Failed to read uploaded file: ${err.message}`);
  }

  // ── Parse with pdf-parse v2 class API ──────────────────────────────────────
  let rawText = "";
  try {
    // Suppress pdf.js console noise; only show real errors
    const parser = new PDFParse({ data: dataBuffer, verbosity: VerbosityLevel.ERRORS });

    // .load() parses the buffer and populates the parser's internal state
    await parser.load();

    // .getText() returns the extracted plain text as a TextResult object
    const textResult = await parser.getText();
    rawText = textResult?.text || "";
  } catch (err) {
    // Surface the real error in development so it is easier to debug
    if (process.env.NODE_ENV === "development") {
      console.error("[pdfExtractor] pdf-parse error:", err.message);
    }
    throw new ApiError(
      400,
      "Could not parse the PDF. The file may be corrupted, password-protected, or in an unsupported format."
    );
  }

  // ── Guard: must have extractable text ──────────────────────────────────────
  if (!rawText || !rawText.trim()) {
    throw new ApiError(
      422,
      "No readable text found in this PDF. The file may be scanned or image-based. Please upload a text-based PDF."
    );
  }

  // ── Normalise whitespace ────────────────────────────────────────────────────
  const normalisedText = rawText
    .replace(/[^\S\n]+/g, " ")   // collapse horizontal whitespace to single space
    .replace(/\n{3,}/g, "\n\n")  // collapse 3+ blank lines to 2
    .trim();

  return normalisedText;
};

export { extractTextFromPDF };
