import LearningProgress from "../models/LearningProgress.model.js";
import CareerReport from "../models/CareerReport.model.js";
import { getCareerReportFromS3 } from "../services/s3Report.service.js";

const flattenMissingSkills = (missingSkills = {}) => {
  const skills = Object.values(missingSkills).flatMap((value) =>
    Array.isArray(value) ? value : []
  );

  return [...new Set(skills)].filter(Boolean);
};

const calculateCurrentReadiness = (baseScore = 0, skills = []) => {
  if (!skills.length) return baseScore;

  const completedCount = skills.filter(
    (skill) => skill.status === "completed"
  ).length;

  const completionRatio = completedCount / skills.length;

  // Estimated readiness moves from base score toward 95%
  const improvedScore = Math.round(baseScore + completionRatio * (95 - baseScore));

  return Math.min(95, improvedScore);
};

const buildProgressStats = (progress) => {
  const totalSkills = progress.skills.length;
  const completedSkills = progress.skills.filter(
    (skill) => skill.status === "completed"
  ).length;

  const nextSkill =
    progress.skills.find((skill) => skill.status !== "completed")?.skill || null;

  return {
    totalSkills,
    completedSkills,
    progressPercentage:
      totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0,
    nextSkill,
  };
};

export const getOrCreateLearningProgress = async (req, res) => {
  try {
    const userId = req.auth?.userId;
    const { reportId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please sign in first.",
      });
    }

    const careerReport = await CareerReport.findOne({
      _id: reportId,
      userId,
    });

    if (!careerReport) {
      return res.status(404).json({
        success: false,
        message: "Career report not found.",
      });
    }

    let progress = await LearningProgress.findOne({
      userId,
      reportId,
    });

    if (!progress) {
      const fullReport = await getCareerReportFromS3(careerReport.s3Key);
      const missingSkillList = flattenMissingSkills(
        fullReport?.reportData?.missingSkills
      );

      const baseReadinessScore = careerReport.readinessScore || 0;

      progress = await LearningProgress.create({
        userId,
        reportId,
        targetRole: careerReport.targetRole,
        baseReadinessScore,
        currentReadinessScore: baseReadinessScore,
        skills: missingSkillList.map((skill) => ({
          skill,
          status: "not_started",
          completedAt: null,
        })),
      });
    }

    return res.status(200).json({
      success: true,
      progress,
      stats: buildProgressStats(progress),
    });
  } catch (error) {
    console.error("Get/Create Learning Progress Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load learning progress.",
    });
  }
};

export const updateLearningSkillStatus = async (req, res) => {
  try {
    const userId = req.auth?.userId;
    const { reportId } = req.params;
    const { skill, status } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please sign in first.",
      });
    }

    if (!skill || !["not_started", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid skill and status are required.",
      });
    }

    const progress = await LearningProgress.findOne({
      userId,
      reportId,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Learning progress not found.",
      });
    }

    progress.skills = progress.skills.map((item) => {
      if (item.skill !== skill) return item;

      return {
        skill: item.skill,
        status,
        completedAt: status === "completed" ? new Date() : null,
      };
    });

    progress.currentReadinessScore = calculateCurrentReadiness(
      progress.baseReadinessScore,
      progress.skills
    );

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Learning progress updated successfully.",
      progress,
      stats: buildProgressStats(progress),
    });
  } catch (error) {
    console.error("Update Learning Progress Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update learning progress.",
    });
  }
};