import { Router } from "express";
import analysisRoutes from "./analysis.routes.js";
import { getJobRoles } from "../controllers/analysis.controller.js";
import careerReportRoutes from "./careerReport.routes.js";

const router = Router();

/**
 * Root API router.
 * All sub-routers are registered here.
 * app.js mounts this under /api.
 */
router.use("/analysis", analysisRoutes);
router.use("/career-reports", careerReportRoutes);
router.get("/job-roles", getJobRoles);

export default router;
