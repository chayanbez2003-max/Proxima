import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse }  from "../utils/ApiResponse.js";
import { ApiError }     from "../utils/ApiError.js";
import { uploadResumeService }    from "../services/analysis/analysis.service.js";
import { runSkillGapAnalysis, getJobRoles as fetchJobRoles } from "../services/matcher/careerIntelligence.service.js";
import Analysis from "../models/Analysis.model.js";

/**
 * uploadResume
 *
 * POST /api/analysis/resume
 *
 * Thin controller responsibilities:
 *  1. Guard: confirm file is present (safety net after middleware).
 *  2. Extract optional body fields.
 *  3. Delegate to the service — which now runs the full M1+M2 pipeline.
 *  4. Return a standardised success response with parsed data.
 */
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file received. Please upload a PDF resume.");
  }

  const { selectedRole } = req.body;

  // Service returns { analysis, parsedData } after M2
  const { analysis, parsedData } = await uploadResumeService(req.file, selectedRole);

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        analysisId: analysis._id,
        status:     analysis.status,
        // Structured parsed fields for the frontend Resume Summary Card
        candidateName: analysis.candidateName,
        email:         analysis.email,
        phone:         analysis.phone,
        github:        analysis.github,
        linkedin:      analysis.linkedin,
        location:      analysis.location,
        education:     analysis.education,
        experience:    analysis.experience,
        // Categorised skills (from parsedData — not flattened)
        skills:        parsedData.skills,
      },
      "Resume uploaded and parsed successfully."
    )
  );
});

/**
 * getAnalysis
 *
 * GET /api/analysis/:id
 * Returns the full Analysis document for a given ID.
 */
const getAnalysis = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findById(req.params.id);

  if (!analysis) {
    throw new ApiError(404, "Analysis not found.");
  }

  return res.status(200).json(
    new ApiResponse(200, analysis, "Analysis retrieved successfully.")
  );
});

/**
 * matchSkills
 *
 * POST /api/analysis/match
 *
 * Runs the Career Intelligence Engine for an existing Analysis document.
 * Body: { analysisId, selectedRole }
 */
const matchSkills = asyncHandler(async (req, res) => {
  const { analysisId, selectedRole } = req.body;

  if (!analysisId) {
    throw new ApiError(400, "analysisId is required.");
  }
  if (!selectedRole || !selectedRole.trim()) {
    throw new ApiError(400, "selectedRole is required.");
  }

  const result = await runSkillGapAnalysis(analysisId, selectedRole.trim());

  return res.status(200).json(
    new ApiResponse(200, result, "Career intelligence analysis completed.")
  );
});

/**
 * getJobRoles
 *
 * GET /api/analysis/roles
 *
 * Returns all seeded job roles for the frontend dropdown.
 */
const getJobRoles = asyncHandler(async (req, res) => {
  const roles = await fetchJobRoles();

  return res.status(200).json(
    new ApiResponse(200, roles, "Job roles fetched successfully.")
  );
});

export { uploadResume, getAnalysis, matchSkills, getJobRoles };
