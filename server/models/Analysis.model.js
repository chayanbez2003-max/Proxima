import mongoose, { Schema } from "mongoose";
import { ANALYSIS_STATUS, PROCESSING_STATUS } from "../config/constants.js";

/**
 * Analysis Schema
 *
 * Represents one resume analysis session.
 * All optional placeholder fields are intentionally sparse —
 * they will be populated in later milestones (parsing, skill matching,
 * gap detection, recommendations, AI).
 *
 * Milestone coverage:
 *  ✅  M1 — Upload (originalFileName, uploadedAt, status, selectedRole, processingStatus)
 *  ✅  M2 — Parsing (extractedText, candidateName, email, phone, github, linkedin, location, education, experience)
 *  ✅  M3 — Career Intelligence (extractedSkills, matchedSkills, missingSkills, extraSkills, matchPercentage)
 *  ✅  M-Auth — Authentication (clerkId — user isolation)
 *  🔜  M4 — Recommendations (recommendations)
 */
const AnalysisSchema = new Schema(
  {
    // ── Authentication (M-Auth) ──────────────────────────
    // Clerk user ID — links this analysis to exactly one authenticated user.
    // Required on all new documents. Future queries always filter by clerkId.
    clerkId: {
      type:     String,
      required: [true, "clerkId is required"],
      trim:     true,
      index:    true,
    },

    // ── Core upload fields (M1) ──────────────────────────
    originalFileName: {
      type:     String,
      required: [true, "originalFileName is required"],
      trim:     true,
    },

    // High-level status of this analysis record
    status: {
      type:    String,
      enum:    Object.values(ANALYSIS_STATUS),
      default: ANALYSIS_STATUS.UPLOADED,
    },

    // Granular processing pipeline status
    processingStatus: {
      type:    String,
      enum:    Object.values(PROCESSING_STATUS),
      default: PROCESSING_STATUS.PENDING,
    },

    // The job role the user selected for matching
    selectedRole: {
      type:    String,
      trim:    true,
      default: null,
    },

    // ── M2 Placeholders — Resume Parsing ───────────────
    extractedText: {
      type:    String,
      default: null,
    },
    candidateName: {
      type:    String,
      trim:    true,
      default: null,
    },
    email: {
      type:    String,
      trim:    true,
      default: null,
    },
    phone: {
      type:    String,
      trim:    true,
      default: null,
    },
    github: {
      type:    String,
      trim:    true,
      default: null,
    },
    linkedin: {
      type:    String,
      trim:    true,
      default: null,
    },
    location: {
      type:    String,
      trim:    true,
      default: null,
    },
    // Structured education blocks parsed from the resume
    education: {
      type:    [Schema.Types.Mixed],
      default: [],
    },
    // Structured work experience blocks parsed from the resume
    experience: {
      type:    [Schema.Types.Mixed],
      default: [],
    },

    // ── M3 — Career Intelligence ─────────────────────────
    // Flat list of skills extracted by the parser (normalised)
    extractedSkills: {
      type:    [String],
      default: [],
    },
    // Categorised skills from gap analysis: { category: string[] }
    matchedSkills: {
      type:    Schema.Types.Mixed,
      default: null,
    },
    missingSkills: {
      type:    Schema.Types.Mixed,
      default: null,
    },
    extraSkills: {
      type:    Schema.Types.Mixed,
      default: null,
    },
    matchPercentage: {
      type:    Number,
      min:     0,
      max:     100,
      default: null,
    },

    // ── M4 Placeholders — Recommendations ──────────────
    recommendations: {
      type:    [Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt (≈ uploadedAt) and updatedAt
  }
);

// Index for querying analyses by status efficiently
AnalysisSchema.index({ status: 1 });
AnalysisSchema.index({ createdAt: -1 });
// Compound index: fast per-user queries sorted by newest
AnalysisSchema.index({ clerkId: 1, createdAt: -1 });


const Analysis = mongoose.model("Analysis", AnalysisSchema);

export default Analysis;
