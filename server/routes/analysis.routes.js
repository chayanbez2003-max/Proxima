import { Router } from "express";
import {
  uploadResume,
  getAnalysis,
  matchSkills,
  getJobRoles,
  getUserAnalyses,
  deleteAnalysisById,
} from "../controllers/analysis.controller.js";
import { uploadResumeMiddleware }  from "../middleware/upload.middleware.js";
import { requireAuthMiddleware }   from "../middleware/auth.middleware.js";

const router = Router();

/**
 * GET /api/analysis/roles
 * Returns all available job roles for the frontend dropdown.
 * PUBLIC — no auth required (roles are not user-specific data).
 * Must be defined BEFORE /:id to avoid "roles" being treated as an ID.
 */
router.get("/roles", getJobRoles);

/**
 * GET /api/analysis/user
 * Returns all analyses belonging to the authenticated user.
 * Used by the Dashboard.
 * PROTECTED — must be before /:id route.
 */
router.get("/user", requireAuthMiddleware, getUserAnalyses);

/**
 * POST /api/analysis/resume
 * Upload a PDF resume and run M1+M2 pipeline (upload + parse).
 * PROTECTED — clerkId extracted from req.auth.userId.
 */
router.post("/resume", requireAuthMiddleware, uploadResumeMiddleware, uploadResume);

/**
 * POST /api/analysis/match
 * Run Career Intelligence Engine for an existing analysis.
 * Body: { analysisId, selectedRole }
 * PROTECTED — ownership verified inside controller.
 */
router.post("/match", requireAuthMiddleware, matchSkills);

/**
 * GET /api/analysis/:id
 * Retrieve a single analysis document by MongoDB ID.
 * PROTECTED — ownership verified inside controller.
 */
router.get("/:id", requireAuthMiddleware, getAnalysis);
router.delete("/:id", requireAuthMiddleware, deleteAnalysisById);

export default router;
