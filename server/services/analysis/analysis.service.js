import Analysis from "../../models/Analysis.model.js";
import { deleteFile }             from "../../utils/fileHelper.js";
import { ANALYSIS_STATUS, PROCESSING_STATUS } from "../../config/constants.js";
import { extractTextFromPDF }     from "../parser/pdfExtractor.service.js";
import { parseResume }            from "../parser/resumeParser.service.js";

/**
 * uploadResumeService
 *
 * Milestone 1 + 2 + M-Auth pipeline:
 *  1. Create an Analysis document with the authenticated user's clerkId.
 *  2. Extract plain text from the PDF          [M2]
 *  3. Parse structured information             [M2]
 *  4. Update the Analysis document in MongoDB  [M2]
 *  5. Clean up the temp file from disk.
 *  6. Return the fully-populated Analysis document.
 *
 * @param {Object} fileInfo            - req.file from Multer
 * @param {string} fileInfo.path       - Absolute path to temp file
 * @param {string} fileInfo.originalname
 * @param {string} clerkId             - Authenticated user's Clerk ID (from req.auth.userId)
 * @param {string} [selectedRole]      - Job role selected by the user
 * @returns {Promise<Object>}          Updated Analysis document
 */
const uploadResumeService = async (fileInfo, clerkId, selectedRole = null) => {
  const { path: filePath, originalname } = fileInfo;

  // ── Step 1: Create the upload record ───────────────────────────────────────
  const analysis = await Analysis.create({
    clerkId,                           // M-Auth: user isolation
    originalFileName: originalname,
    selectedRole:     selectedRole || null,
    status:           ANALYSIS_STATUS.UPLOADED,
    processingStatus: PROCESSING_STATUS.PENDING,
  });

  // Declare above try so they are in scope at the return statement.
  let extractedText = null;
  let parsed        = null;

  try {
    // ── Step 2: Extract text from PDF ────────────────────────────────────────
    extractedText = await extractTextFromPDF(filePath);

    // ── Step 3: Parse structured fields ─────────────────────────────────────
    parsed = parseResume(extractedText);

    // ── Step 4: Persist parsed data ─────────────────────────────────────────
    analysis.extractedText    = extractedText;
    analysis.candidateName    = parsed.candidateName;
    analysis.email            = parsed.email;
    analysis.phone            = parsed.phone;
    analysis.github           = parsed.github   ?? null;
    analysis.linkedin         = parsed.linkedin ?? null;
    analysis.location         = parsed.location ?? null;
    analysis.education        = parsed.education;
    analysis.experience       = parsed.experience;
    // extractedSkills stored as flat de-duped array for M3 matching;
    // full categorised object is returned in the API response.
    analysis.extractedSkills  = Object.values(parsed.skills).flat();
    analysis.status           = ANALYSIS_STATUS.PARSED;
    analysis.processingStatus = PROCESSING_STATUS.COMPLETED;

    await analysis.save();
  } catch (parseError) {
    // Parsing failed — mark as failed but don't lose the upload record.
    analysis.processingStatus = PROCESSING_STATUS.FAILED;
    await analysis.save();

    // Re-throw so the controller's asyncHandler propagates to the global
    // error handler and returns the correct HTTP status to the client.
    throw parseError;
  } finally {
    // ── Step 5: Always clean up temp file ───────────────────────────────────
    deleteFile(filePath);
  }

  // Return already-computed `parsed` — no second parseResume() call needed.
  return { analysis, parsedData: parsed };
};

/**
 * getAnalysesByUser
 *
 * Returns all Analysis documents belonging to the authenticated user,
 * sorted newest first. Used by the Dashboard to display the user's history.
 *
 * @param {string} clerkId - Authenticated user's Clerk ID
 * @returns {Promise<Array>} Array of Analysis documents (lean)
 */
const getAnalysesByUser = async (clerkId) => {
  return Analysis
    .find({ clerkId })
    .sort({ createdAt: -1 })
    .select(
      "originalFileName status processingStatus candidateName selectedRole matchPercentage createdAt"
    )
    .lean();
};

export { uploadResumeService, getAnalysesByUser };
