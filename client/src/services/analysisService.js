import { uploadResumeApi, getAnalysisApi, getJobRolesApi, matchSkillsApi } from "../api/analysis.api.js";

/**
 * uploadResumeService
 *
 * Frontend service layer — validates the file client-side,
 * calls the API, and extracts the full M2 parsed payload from the response.
 *
 * @param {File}     file
 * @param {string}   [selectedRole]
 * @param {Function} [onProgress]
 * @returns {Promise<{
 *   analysisId:    string,
 *   status:        string,
 *   candidateName: string|null,
 *   email:         string|null,
 *   phone:         string|null,
 *   github:        string|null,
 *   linkedin:      string|null,
 *   location:      string|null,
 *   education:     Array,
 *   experience:    Array,
 *   skills:        Object
 * }>}
 */
const uploadResumeService = async (file, selectedRole = null, onProgress = null) => {
  // ── Client-side validation ────────────────────────────────────────────────
  if (!file) throw new Error("Please select a PDF file before uploading.");
  if (file.type !== "application/pdf")
    throw new Error("Invalid file type. Only PDF files are accepted.");

  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE)
    throw new Error("File size exceeds 5 MB. Please upload a smaller PDF.");

  // ── API call ──────────────────────────────────────────────────────────────
  const response = await uploadResumeApi(file, selectedRole, onProgress);
  const payload  = response.data.data;

  // Return the complete parsed payload — the hook stores it in `result`
  return {
    analysisId:    payload.analysisId,
    status:        payload.status,
    candidateName: payload.candidateName ?? null,
    email:         payload.email         ?? null,
    phone:         payload.phone         ?? null,
    github:        payload.github        ?? null,
    linkedin:      payload.linkedin      ?? null,
    location:      payload.location      ?? null,
    education:     payload.education     ?? [],
    experience:    payload.experience    ?? [],
    skills:        payload.skills        ?? {},
  };
};

/**
 * getJobRolesService
 * Fetches all available job roles for the dropdown.
 * @returns {Promise<Array<{role: string, category: string}>>}
 */
const getJobRolesService = async () => {
  const response = await getJobRolesApi();
  return response.data.data; // array of { _id, role, category }
};

/**
 * matchSkillsService
 * Calls the Career Intelligence Engine for a parsed analysis.
 * @param {string} analysisId
 * @param {string} selectedRole
 */
const matchSkillsService = async (analysisId, selectedRole) => {
  if (!analysisId) throw new Error("Analysis ID is required.");
  if (!selectedRole) throw new Error("Please select a target job role.");

  const response = await matchSkillsApi(analysisId, selectedRole);
  return response.data.data;
};

/**
 * getAnalysisService
 * Fetches an existing Analysis document by ID.
 * Used by AnalysisPage to hydrate when navigating directly to /analysis/:id.
 * @param {string} analysisId
 */
const getAnalysisService = async (analysisId) => {
  if (!analysisId) throw new Error("Analysis ID is required.");
  const response = await getAnalysisApi(analysisId);
  const doc = response.data.data;
  // Normalise to the same shape as uploadResumeService return
  return {
    analysisId:    doc._id,
    status:        doc.status,
    candidateName: doc.candidateName ?? null,
    email:         doc.email         ?? null,
    phone:         doc.phone         ?? null,
    github:        doc.github        ?? null,
    linkedin:      doc.linkedin      ?? null,
    location:      doc.location      ?? null,
    education:     doc.education     ?? [],
    experience:    doc.experience    ?? [],
    skills:        doc.extractedSkills ?? {},
    // M3 fields (present if analysis was already run)
    matchedSkills:   doc.matchedSkills   ?? null,
    missingSkills:   doc.missingSkills   ?? null,
    extraSkills:     doc.extraSkills     ?? null,
    matchPercentage: doc.matchPercentage ?? null,
    selectedRole:    doc.selectedRole    ?? null,
  };
};

export { uploadResumeService, getAnalysisService, getJobRolesService, matchSkillsService };
