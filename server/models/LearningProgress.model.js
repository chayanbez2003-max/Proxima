import mongoose from "mongoose";

const learningSkillSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["not_started", "completed"],
      default: "not_started",
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const learningProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerReport",
      required: true,
      index: true,
    },

    targetRole: {
      type: String,
      required: true,
      trim: true,
    },

    baseReadinessScore: {
      type: Number,
      default: 0,
    },

    currentReadinessScore: {
      type: Number,
      default: 0,
    },

    skills: {
      type: [learningSkillSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

learningProgressSchema.index({ userId: 1, reportId: 1 }, { unique: true });

const LearningProgress = mongoose.model(
  "LearningProgress",
  learningProgressSchema
);

export default LearningProgress;