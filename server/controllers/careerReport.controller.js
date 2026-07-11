import mongoose from "mongoose";
import CareerReport from "../models/CareerReport.model.js";
import {
  uploadCareerReportToS3,
  getCareerReportFromS3,
} from "../services/s3Report.service.js";

const calculateReadinessScore = (reportData = {}) => {
  const matchPercentage = Number(reportData.matchPercentage || 0);
  const totalRequired = Number(reportData.totalRequired || 0);
  const totalMatched = Number(reportData.totalMatched || 0);

  const skillCoverage =
    totalRequired > 0 ? Math.round((totalMatched / totalRequired) * 100) : 0;

  return Math.round(matchPercentage * 0.7 + skillCoverage * 0.3);
};

export const saveCareerReport = async (req, res) => {
  try {
    const userId = req.auth?.userId;

    const { analysisId, targetRole, reportData } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please sign in first.",
      });
    }

    if (!analysisId || !targetRole || !reportData) {
      return res.status(400).json({
        success: false,
        message: "analysisId, targetRole, and reportData are required.",
      });
    }

    const reportId = new mongoose.Types.ObjectId();

    const readinessScore = calculateReadinessScore(reportData);

    const fullReportData = {
      reportId: reportId.toString(),
      userId,
      analysisId,
      targetRole,
      readinessScore,
      generatedAt: new Date().toISOString(),
      reportData,
    };

    const s3Result = await uploadCareerReportToS3({
      userId,
      reportId: reportId.toString(),
      reportData: fullReportData,
    });

    const careerReport = await CareerReport.create({
      _id: reportId,
      userId,
      analysisId,
      targetRole,
      matchPercentage: reportData.matchPercentage || 0,
      readinessScore,
      s3Bucket: s3Result.bucket,
      s3Key: s3Result.key,
    });

    return res.status(201).json({
      success: true,
      message: "Career report saved successfully.",
      report: careerReport,
    });
  } catch (error) {
    console.error("Save Career Report Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save career report.",
    });
  }
};

export const getUserCareerReports = async (req, res) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please sign in first.",
      });
    }

    const reports = await CareerReport.find({ userId })
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error("Get User Career Reports Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch career reports.",
    });
  }
};

export const getCareerReportById = async (req, res) => {
  try {
    const userId = req.auth?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please sign in first.",
      });
    }

    const report = await CareerReport.findOne({
      _id: id,
      userId,
    }).select("-__v");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Career report not found.",
      });
    }

    const fullReport = await getCareerReportFromS3(report.s3Key);

    return res.status(200).json({
      success: true,
      report,
      fullReport,
    });
  } catch (error) {
    console.error("Get Career Report Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch career report.",
    });
  }
};