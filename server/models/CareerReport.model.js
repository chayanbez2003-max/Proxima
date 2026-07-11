import mongoose from "mongoose";

const careerReportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    analysisId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analysis",
      required: true,
      index: true,
    },

    targetRole: {
      type: String,
      required: true,
      trim: true,
    },

    matchPercentage: {
      type: Number,
      default: 0,
    },

    readinessScore: {
      type: Number,
      default: 0,
    },

    s3Bucket: {
      type: String,
      required: true,
    },

    s3Key: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CareerReport = mongoose.model("CareerReport", careerReportSchema);

export default CareerReport;