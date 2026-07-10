import { Router } from "express";
import {
  uploadResume,
  getAnalysis,
  matchSkills,
  getJobRoles,
} from "../controllers/analysis.controller.js";
import { uploadResumeMiddleware } from "../middleware/upload.middleware.js";

const router = Router();

/**
 * GET /api/analysis/roles
 * Returns all available job roles for the frontend dropdown.
 * Must be defined BEFORE /:id to avoid "roles" being treated as an ID.
 */
router.get("/roles", getJobRoles);

/**
 * POST /api/analysis/resume
 * Upload a PDF resume and run M1+M2 pipeline (upload + parse).
 */
router.post("/resume", uploadResumeMiddleware, uploadResume);

/**
 * POST /api/analysis/match
 * Run Career Intelligence Engine for an existing analysis.
 * Body: { analysisId, selectedRole }
 */
router.post("/match", matchSkills);

/**
 * GET /api/analysis/:id
 * Retrieve a single analysis document by MongoDB ID.
 */
router.get("/:id", getAnalysis);

export default router;
