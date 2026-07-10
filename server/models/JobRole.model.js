import mongoose, { Schema } from "mongoose";

/**
 * JobRole Schema
 *
 * Represents a target career role with its required skills.
 * Seeded via server/data/jobRoles.js at first startup.
 *
 * Used by:
 *  - Career Intelligence Engine (M3): skill gap comparison
 *  - Frontend dropdown: list available roles
 *  - Gemini prompts (M4): role-specific career advice
 */
const JobRoleSchema = new Schema(
  {
    // Canonical role title — unique, used as the matching key
    role: {
      type:     String,
      required: [true, "role is required"],
      trim:     true,
      unique:   true,
    },

    // Broad category for grouping in the UI dropdown
    category: {
      type: String,
      trim: true,
      enum: [
        "Web Development",
        "Backend Development",
        "Mobile Development",
        "Data & AI",
        "DevOps & Cloud",
        "Security",
        "QA & Testing",
        "Design",
        "Management",
        "Blockchain & Other",
      ],
      required: true,
    },

    // Required skills organised by sub-category
    // { programmingLanguages: [...], frontend: [...], ... }
    // Mirrors SKILLS_CATALOG categories for direct comparison
    requiredSkills: {
      type:    Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

JobRoleSchema.index({ category: 1 });

const JobRole = mongoose.model("JobRole", JobRoleSchema);

export default JobRole;
