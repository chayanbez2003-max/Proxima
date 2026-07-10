import JobRole from "../../models/JobRole.model.js";
import Analysis from "../../models/Analysis.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ANALYSIS_STATUS, PROCESSING_STATUS } from "../../config/constants.js";
import { SKILLS_CATALOG, CATEGORY_LABELS } from "../../data/skillsCatalog.js";
import {
  normalizeSkills,
  buildNormalizedSet,
  flattenCategorizedSkills,
} from "../../utils/skillNormalizer.js";

// ─── Private helpers ──────────────────────────────────────────────────────────

/**
 * flattenJobRoleSkills
 *
 * Converts a JobRole's requiredSkills object into a flat, normalised array.
 * Also returns the categorized form for grouped output.
 *
 * @param {Object} requiredSkills - { category: string[] }
 * @returns {{ flat: string[], categorized: Object }}
 */
const flattenJobRoleSkills = (requiredSkills) => {
  const categorized = {};
  const flat = [];

  for (const [category, skills] of Object.entries(requiredSkills)) {
    const normalised = normalizeSkills(skills);
    categorized[category] = normalised;
    flat.push(...normalised);
  }

  return { flat: [...new Set(flat)], categorized };
};

/**
 * groupSkillsByCategory
 *
 * Given a flat list of canonical skill names and the job role's categorized
 * required skills, groups the flat list back into categories.
 * Skills not found in any role category go into "others".
 *
 * @param {string[]}  skillList    - Flat list of canonical skill names
 * @param {Object}    roleCategorized - { category: string[] } from job role
 * @returns {Object}  { category: string[] }
 */
const groupSkillsByCategory = (skillList, roleCategorized) => {
  // Build reverse map: lowercase canonical → category
  const reverseMap = new Map();
  for (const [category, skills] of Object.entries(roleCategorized)) {
    for (const skill of skills) {
      reverseMap.set(skill.toLowerCase(), category);
    }
  }

  // Also check global catalog
  for (const [category, skills] of Object.entries(SKILLS_CATALOG)) {
    for (const skill of skills) {
      const key = skill.toLowerCase();
      if (!reverseMap.has(key)) reverseMap.set(key, category);
    }
  }

  const grouped = {};
  const unmatched = [];

  for (const skill of skillList) {
    const category = reverseMap.get(skill.toLowerCase());
    if (category) {
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(skill);
    } else {
      unmatched.push(skill);
    }
  }

  if (unmatched.length) grouped.others = unmatched;
  return grouped;
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * runSkillGapAnalysis
 *
 * Full Career Intelligence pipeline:
 *  1. Fetch the Analysis document and validate its state.
 *  2. Fetch the JobRole document.
 *  3. Normalize resume skills and role skills.
 *  4. Match → find matched, missing, extra skills.
 *  5. Calculate match percentage.
 *  6. Update the Analysis document.
 *  7. Return the structured result.
 *
 * @param {string} analysisId  - MongoDB ObjectId of the Analysis document
 * @param {string} selectedRole - Target job role string (e.g. "MERN Developer")
 * @returns {Promise<Object>}  Full career intelligence result
 */
const runSkillGapAnalysis = async (analysisId, selectedRole) => {
  // ── Step 1: Fetch & validate Analysis document ─────────────────────────────
  const analysis = await Analysis.findById(analysisId);

  if (!analysis) {
    throw new ApiError(404, "Analysis not found. Please upload your resume first.");
  }

  if (analysis.status === ANALYSIS_STATUS.UPLOADED) {
    throw new ApiError(400, "Resume has not been parsed yet. Please wait for parsing to complete.");
  }

  // ── Step 2: Fetch JobRole ──────────────────────────────────────────────────
  const jobRole = await JobRole.findOne({
    role: { $regex: new RegExp(`^${selectedRole.trim()}$`, "i") },
  });

  if (!jobRole) {
    throw new ApiError(
      404,
      `Job role "${selectedRole}" was not found. Please select a role from the dropdown.`
    );
  }

  // ── Step 3: Normalise skills ───────────────────────────────────────────────
  // Resume skills come from the flat extractedSkills array (populated by M2 parser)
  const rawResumeSkills = analysis.extractedSkills || [];
  const normalisedResumeSkills = normalizeSkills(rawResumeSkills);
  const resumeSkillSet         = buildNormalizedSet(normalisedResumeSkills);

  // Role skills
  const { flat: roleSkillsFlat, categorized: roleCategorized } =
    flattenJobRoleSkills(jobRole.requiredSkills);
  const roleSkillSet = buildNormalizedSet(roleSkillsFlat);

  // ── Step 4: Compute matched, missing, extra ────────────────────────────────
  const matchedFlat  = normalisedResumeSkills.filter((s) => roleSkillSet.has(s.toLowerCase()));
  const missingFlat  = roleSkillsFlat.filter((s) => !resumeSkillSet.has(s.toLowerCase()));
  const extraFlat    = normalisedResumeSkills.filter((s) => !roleSkillSet.has(s.toLowerCase()));

  // ── Step 5: Calculate match percentage ────────────────────────────────────
  const totalRequired  = roleSkillsFlat.length;
  const matchPercentage = totalRequired > 0
    ? Math.round((matchedFlat.length / totalRequired) * 100)
    : 0;

  // ── Step 6: Group skills by category for richer UI output ─────────────────
  const matchedSkills = groupSkillsByCategory(matchedFlat, roleCategorized);
  const missingSkills = groupSkillsByCategory(missingFlat, roleCategorized);
  const extraSkills   = groupSkillsByCategory(extraFlat,   roleCategorized);

  // ── Step 7: Persist results to Analysis document ──────────────────────────
  analysis.selectedRole      = jobRole.role;
  analysis.matchedSkills     = matchedSkills;
  analysis.missingSkills     = missingSkills;
  analysis.extraSkills       = extraSkills;
  analysis.matchPercentage   = matchPercentage;
  analysis.status            = ANALYSIS_STATUS.ANALYZED;
  analysis.processingStatus  = PROCESSING_STATUS.COMPLETED;

  await analysis.save();

  // ── Step 8: Return structured result ──────────────────────────────────────
  return {
    analysisId:      analysis._id,
    selectedRole:    jobRole.role,
    roleCategory:    jobRole.category,
    matchPercentage,
    matchedSkills,
    missingSkills,
    extraSkills,
    totalRequired,
    totalMatched:    matchedFlat.length,
    totalMissing:    missingFlat.length,
    totalExtra:      extraFlat.length,
    categoryLabels:  CATEGORY_LABELS,
  };
};

/**
 * getJobRoles
 *
 * Returns all available job roles for the frontend dropdown.
 * Grouped by category for a structured <optgroup> dropdown.
 *
 * @returns {Promise<Object[]>} Array of { role, category }
 */
const getJobRoles = async () => {
  const roles = await JobRole.find({}, "role category").sort({ category: 1, role: 1 }).lean();
  return roles;
};

export { runSkillGapAnalysis, getJobRoles };
