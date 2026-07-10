import { SKILL_ALIASES }  from "../data/skillAliases.js";
import { ALL_SKILLS_FLAT } from "../data/skillsCatalog.js";

/**
 * skillNormalizer.js
 *
 * Reusable skill normalisation pipeline.
 *
 * Pipeline for each skill string:
 *  1. Trim whitespace
 *  2. Lowercase
 *  3. Resolve alias (alias map uses lowercase keys)
 *  4. Return canonical form from catalog, or the alias-resolved form
 *
 * Public API:
 *  - normalizeSkill(skill)       → single canonical string (or null)
 *  - normalizeSkills(skillArray) → deduplicated canonical string[]
 *  - buildNormalizedSet(arr)     → Set<string> of lowercased canonicals
 */

// Build a lowercase → canonical lookup from the flat catalog once at startup
const CATALOG_LOWER_MAP = new Map(
  ALL_SKILLS_FLAT.map((s) => [s.toLowerCase(), s])
);

/**
 * normalizeSkill
 *
 * @param {string} raw - A single skill string (any casing)
 * @returns {string|null} Canonical skill name, or null if unrecognisable
 */
const normalizeSkill = (raw) => {
  if (!raw || typeof raw !== "string") return null;

  const trimmed = raw.trim();
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();

  // 1. Check alias map first
  if (SKILL_ALIASES[lower]) {
    const aliasResolved = SKILL_ALIASES[lower];
    // Verify the resolved alias is in the catalog
    return CATALOG_LOWER_MAP.get(aliasResolved.toLowerCase()) ?? aliasResolved;
  }

  // 2. Direct catalog lookup (case-insensitive)
  if (CATALOG_LOWER_MAP.has(lower)) {
    return CATALOG_LOWER_MAP.get(lower);
  }

  // 3. Not in catalog or aliases — return trimmed original
  //    (preserves custom/niche skills that aren't in the catalog)
  return trimmed;
};

/**
 * normalizeSkills
 *
 * Normalises an array of raw skill strings.
 * Removes nulls and deduplicates by lowercase canonical name.
 *
 * @param {string[]} rawSkills
 * @returns {string[]} Unique canonical skill names
 */
const normalizeSkills = (rawSkills) => {
  if (!Array.isArray(rawSkills)) return [];

  const seen = new Set();
  const result = [];

  for (const raw of rawSkills) {
    const canonical = normalizeSkill(raw);
    if (!canonical) continue;

    const key = canonical.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(canonical);
    }
  }

  return result;
};

/**
 * buildNormalizedSet
 *
 * Returns a Set of lowercase canonical skill names for O(1) lookup.
 * Used internally by the career intelligence engine during matching.
 *
 * @param {string[]} rawSkills
 * @returns {Set<string>}
 */
const buildNormalizedSet = (rawSkills) => {
  return new Set(normalizeSkills(rawSkills).map((s) => s.toLowerCase()));
};

/**
 * flattenCategorizedSkills
 *
 * Flattens a { category: string[] } skills object into a single array.
 * Useful for converting M2 parser output before normalisation.
 *
 * @param {Object} categorizedSkills
 * @returns {string[]}
 */
const flattenCategorizedSkills = (categorizedSkills) => {
  if (!categorizedSkills || typeof categorizedSkills !== "object") return [];
  return Object.values(categorizedSkills).flat().filter(Boolean);
};

export { normalizeSkill, normalizeSkills, buildNormalizedSet, flattenCategorizedSkills };
