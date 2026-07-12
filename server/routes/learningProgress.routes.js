import { Router } from "express";
import { requireAuthMiddleware } from "../middleware/auth.middleware.js";
import {
  getOrCreateLearningProgress,
  updateLearningSkillStatus,
} from "../controllers/learningProgress.controller.js";

const router = Router();

router.get("/:reportId", requireAuthMiddleware, getOrCreateLearningProgress);

router.patch(
  "/:reportId/skills",
  requireAuthMiddleware,
  updateLearningSkillStatus
);

export default router;