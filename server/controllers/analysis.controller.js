import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse }  from "../utils/ApiResponse.js";
import { ApiError }     from "../utils/ApiError.js";
import { getAuth }      from "@clerk/express";
import { uploadResumeService, getAnalysesByUser } from "../services/analysis/analysis.service.js";
import { runSkillGapAnalysis, getJobRoles as fetchJobRoles } from "../services/matcher/careerIntelligence.service.js";
import Analysis from "../models/Analysis.model.js";

/**
 * uploadResume
 *
 * POST /api/analysis/resume
 *
 * Thin controller responsibilities:
 *  1. Guard: confirm file is present (safety net after middleware).
 *  2. Extract clerkId from req.auth (populated by Clerk middleware).
 *  3. Extract optional body fields.
 *  4. Delegate to the service — which runs the full M1+M2 pipeline.
 *  5. Return a standardised success response with parsed data.
 */
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file received. Please upload a PDF resume.");
  }

  // M-Auth: getAuth(req) is the @clerk/express v2 API — req.auth is a function, not an object
  const clerkId = getAuth(req).userId;
  if (!clerkId) {
    throw new ApiError(401, "Unauthorized. Please sign in to upload a resume.");
  }

  const { selectedRole } = req.body;

  // Service returns { analysis, parsedData } after M2
  const { analysis, parsedData } = await uploadResumeService(req.file, clerkId, selectedRole);

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
 *
 * Returns the full Analysis document for a given ID.
 * Ownership check: ensures the document belongs to the requesting user.
 */
const getAnalysis = asyncHandler(async (req, res) => {
  const clerkId  = getAuth(req).userId;
  const analysis = await Analysis.findById(req.params.id);

  if (!analysis) {
    throw new ApiError(404, "Analysis not found.");
  }

  // Ownership guard — users can only read their own analyses
  if (analysis.clerkId !== clerkId) {
    throw new ApiError(403, "You do not have permission to view this analysis.");
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
  const clerkId = getAuth(req).userId;

  if (!analysisId) {
    throw new ApiError(400, "analysisId is required.");
  }
  if (!selectedRole || !selectedRole.trim()) {
    throw new ApiError(400, "selectedRole is required.");
  }

  // Ownership check before running analysis
  const analysis = await Analysis.findById(analysisId).select("clerkId");
  if (!analysis) {
    throw new ApiError(404, "Analysis not found.");
  }
  if (analysis.clerkId !== clerkId) {
    throw new ApiError(403, "You do not have permission to analyse this document.");
  }

  const result = await runSkillGapAnalysis(analysisId, selectedRole.trim());

  return res.status(200).json(
    new ApiResponse(200, result, "Career intelligence analysis completed.")
  );
});

/**
 * getJobRoles
 *
 * GET /api/job-roles
 *
 * Returns all seeded job roles for the frontend dropdown.
 * Public — no auth required (roles are not user-specific).
 */
const getJobRoles = asyncHandler(async (req, res) => {
  const roles = await fetchJobRoles();

  return res.status(200).json(
    new ApiResponse(200, roles, "Job roles fetched successfully.")
  );
});

/**
 * getUserAnalyses
 *
 * GET /api/analysis/user
 *
 * Returns all analyses belonging to the authenticated user.
 * Used by the Dashboard to show the user's upload history.
 */
const getUserAnalyses = asyncHandler(async (req, res) => {
  const clerkId = getAuth(req).userId;
  if (!clerkId) {
    throw new ApiError(401, "Unauthorized.");
  }

  const analyses = await getAnalysesByUser(clerkId);

  return res.status(200).json(
    new ApiResponse(200, analyses, "User analyses retrieved successfully.")
  );
});

export { uploadResume, getAnalysis, matchSkills, getJobRoles, getUserAnalyses };
