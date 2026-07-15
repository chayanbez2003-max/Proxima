import { Router } from "express";
import { requireAuthMiddleware } from "../middleware/auth.middleware.js";
import {
  saveCareerReport,
  getUserCareerReports,
  getCareerReportById,
  deleteCareerReportById,
} from "../controllers/careerReport.controller.js";

const router = Router();

router.post("/", requireAuthMiddleware, saveCareerReport);
router.get("/", requireAuthMiddleware, getUserCareerReports);
router.get("/:id", requireAuthMiddleware, getCareerReportById);
router.delete("/:id", requireAuthMiddleware, deleteCareerReportById);

export default router;