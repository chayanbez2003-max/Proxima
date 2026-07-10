import * as RX              from "../../utils/regexPatterns.js";
import { SKILLS_DICTIONARY } from "./skillsDictionary.js";

// ─── Private helpers ──────────────────────────────────────────────────────────

/**
 * extractFirst
 * Returns the first regex match in `text`, or null if none found.
 * Trims the result and strips surrounding punctuation.
 *
 * @param {string}  text
 * @param {RegExp}  pattern
 * @returns {string|null}
 */
const extractFirst = (text, pattern) => {
  const match = text.match(pattern);
  if (!match) return null;
  return match[0].trim().replace(/[,;|]+$/, "");
};

/**
 * splitIntoLines
 * Converts text into a trimmed, non-empty array of lines.
 */
const splitIntoLines = (text) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

/**
 * extractCandidateName
 *
 * Heuristic: the candidate name is typically the very first non-empty line
 * that is NOT an email, URL, phone number, section header, or all-caps acronym.
 *
 * Limitations: fails if the first line is a job title or the resume is
 * header-heavy. M4 Gemini integration will provide a reliable fallback.
 *
 * @param {string}   text  - Full resume text
 * @param {string|null} email - Already-extracted email (to skip that line)
 * @returns {string|null}
 */
const extractCandidateName = (text, email) => {
  const lines = splitIntoLines(text);

  for (const line of lines.slice(0, 8)) { // inspect first 8 lines only
    // Skip lines that look like an email, URL, phone, or section header
    if (RX.EMAIL.test(line))    continue;
    if (RX.LINKEDIN.test(line)) continue;
    if (RX.GITHUB.test(line))   continue;
    if (RX.PHONE.test(line))    continue;
    if (RX.SECTION_HEADER.test(line)) continue;

    // Skip very short tokens, numbers, lines with special chars
    if (line.length < 2 || line.length > 60) continue;
    if (/\d/.test(line))        continue;
    if (/[<>{}[\]#@]/.test(line)) continue;

    // A plausible name: 2–4 words of mostly alpha characters
    const words = line.split(/\s+/);
    if (words.length >= 2 && words.length <= 5) {
      const allAlpha = words.every((w) => /^[A-Za-z.\-']{1,25}$/.test(w));
      if (allAlpha) return line;
    }
  }
  return null;
};

/**
 * extractLocation
 *
 * Searches for a "City, Region" pattern.  Falls back to null cleanly.
 *
 * @param {string} text
 * @returns {string|null}
 */
const extractLocation = (text) => {
  // Prefer lines that look like a location (short line with comma)
  const lines = splitIntoLines(text);
  for (const line of lines.slice(0, 15)) {
    if (line.length > 60) continue;
    const m = line.match(RX.LOCATION);
    if (m) return m[0].trim();
  }
  return null;
};

/**
 * extractSection
 *
 * Extracts the raw text of a named resume section.
 * Returns the content between the found header and the next header (or EOF).
 *
 * @param {string}   text         - Full resume text
 * @param {string[]} headerNames  - Alternative names for this section
 * @returns {string} Section text, or empty string if not found
 */
const extractSection = (text, headerNames) => {
  const lines      = text.split("\n");
  const headerRE   = new RegExp(
    `^(${headerNames.join("|")})\\s*:?\\s*$`,
    "i"
  );
  const anyHeaderRE = RX.SECTION_HEADER;

  let insideSection = false;
  const sectionLines = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (headerRE.test(trimmed)) {
      insideSection = true;
      continue; // skip the header line itself
    }

    if (insideSection) {
      if (anyHeaderRE.test(trimmed)) break; // hit the next section
      sectionLines.push(line);
    }
  }

  return sectionLines.join("\n").trim();
};

/**
 * extractEducation
 *
 * Returns an array of education objects parsed from the Education section.
 * Each object: { institution, degree, year, gpa }
 *
 * @param {string} text - Full resume text
 * @returns {Array<Object>}
 */
const extractEducation = (text) => {
  const sectionText = extractSection(text, [
    "education", "educational background", "academic background",
    "academic qualifications", "qualifications",
  ]);

  if (!sectionText) return [];

  const blocks    = sectionText.split(/\n{2,}/); // blank-line-separated blocks
  const education = [];

  for (const block of blocks) {
    if (!block.trim()) continue;

    const lines = splitIntoLines(block);
    if (!lines.length) continue;

    const yearMatches = block.match(RX.YEAR);
    const gpaMatch    = block.match(RX.GPA);
    const degreeMatch = block.match(RX.DEGREE);

    education.push({
      institution: lines[0] || null,
      degree:      degreeMatch ? degreeMatch[0] : (lines[1] || null),
      year:        yearMatches ? yearMatches[yearMatches.length - 1] : null,
      gpa:         gpaMatch ? gpaMatch[1] : null,
    });
  }

  return education.filter((e) => e.institution);
};

/**
 * extractExperience
 *
 * Returns an array of work experience objects.
 * Each object: { company, title, duration, description }
 *
 * @param {string} text - Full resume text
 * @returns {Array<Object>}
 */
const extractExperience = (text) => {
  const sectionText = extractSection(text, [
    "experience", "work experience", "professional experience",
    "employment", "employment history", "work history", "internship",
    "internships",
  ]);

  if (!sectionText) return [];

  const blocks     = sectionText.split(/\n{2,}/);
  const experience = [];

  for (const block of blocks) {
    if (!block.trim()) continue;

    const lines     = splitIntoLines(block);
    if (!lines.length) continue;

    const duration   = extractFirst(block, RX.DATE_RANGE);
    const allText    = lines.join(" ");

    experience.push({
      company:     lines[0] || null,
      title:       lines[1] || null,
      duration:    duration || null,
      description: allText,
    });
  }

  return experience.filter((e) => e.company);
};

/**
 * extractSkills
 *
 * Matches the full resume text against the SKILLS_DICTIONARY.
 * Returns a categorised object — no flat arrays.
 *
 * Strategy:
 *  1. Build a single regex per category for efficient matching.
 *  2. Use whole-word matching so "C" doesn't match "CSS".
 *  3. Deduplicate via Set; preserve canonical casing from the dictionary.
 *
 * @param {string} text - Full resume text
 * @returns {Object} Categorised skills object
 */
const extractSkills = (text) => {
  const result = {};

  for (const [category, skills] of Object.entries(SKILLS_DICTIONARY)) {
    const found = new Set();

    for (const skill of skills) {
      // Escape special regex chars in skill name
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Whole-word boundary — handles "C++" and "Node.js" carefully
      const boundary = /[a-zA-Z0-9]/.test(skill[skill.length - 1])
        ? `\\b${escaped}\\b`
        : `\\b${escaped}`;

      const skillRE = new RegExp(boundary, "i");
      if (skillRE.test(text)) {
        found.add(skill); // canonical casing from dictionary
      }
    }

    result[category] = [...found];
  }

  return result;
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * parseResume
 *
 * Orchestrates all extraction steps and returns a structured object.
 *
 * @param {string} text - Plain text extracted by pdfExtractor.service.js
 * @returns {{
 *   candidateName: string|null,
 *   email:         string|null,
 *   phone:         string|null,
 *   github:        string|null,
 *   linkedin:      string|null,
 *   portfolio:     string|null,
 *   location:      string|null,
 *   education:     Array<Object>,
 *   experience:    Array<Object>,
 *   skills:        Object
 * }}
 */
const parseResume = (text) => {
  // Contact — extract early so candidateName heuristic can skip those lines
  const email    = extractFirst(text, RX.EMAIL);
  const phone    = extractFirst(text, RX.PHONE);
  const linkedin = extractFirst(text, RX.LINKEDIN);
  const github   = extractFirst(text, RX.GITHUB);

  // Remove already-matched URLs before searching for portfolio
  // to avoid re-matching LinkedIn or GitHub as portfolio
  const textWithoutKnown = text
    .replace(RX.LINKEDIN, "")
    .replace(RX.GITHUB, "");
  const portfolio = extractFirst(textWithoutKnown, RX.PORTFOLIO);

  const candidateName = extractCandidateName(text, email);
  const location      = extractLocation(text);

  const education  = extractEducation(text);
  const experience = extractExperience(text);
  const skills     = extractSkills(text);

  return {
    candidateName,
    email,
    phone,
    github,
    linkedin,
    portfolio,
    location,
    education,
    experience,
    skills,
  };
};

export { parseResume };
