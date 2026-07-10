/**
 * regexPatterns.js
 *
 * Centralised regex library.  All patterns are compiled once and reused
 * across the parser services — no inline regex duplication.
 *
 * Conventions:
 *  - Every pattern has a comment explaining what it matches and why.
 *  - Use named capture groups where possible for readability.
 *  - Flag `i` = case-insensitive, `m` = multiline, `g` = global.
 */

// ─── Contact info ────────────────────────────────────────────────────────────

/**
 * Standard e-mail address.
 * Matches: user@domain.com, first.last+tag@sub.domain.co.uk
 */
export const EMAIL = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;

/**
 * Phone numbers — handles a wide variety of international formats:
 *   +91 98765 43210 | (555) 123-4567 | 555.123.4567 | +1-800-555-0100
 * Captured group 0 is the full match.
 */
export const PHONE =
  /(?:\+?\d{1,3}[\s\-.]?)?\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4}/;

// ─── Profile URLs ─────────────────────────────────────────────────────────────

/**
 * LinkedIn profile URL.
 * Matches: linkedin.com/in/username or www.linkedin.com/in/username
 */
export const LINKEDIN =
  /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w\-_%]+\/?/i;

/**
 * GitHub profile URL.
 * Matches: github.com/username or www.github.com/username
 * Does NOT match repository or gist URLs.
 */
export const GITHUB =
  /(?:https?:\/\/)?(?:www\.)?github\.com\/[\w\-]+\/?(?!\S)/i;

/**
 * Generic portfolio / personal website URL.
 * Used as a fallback after LinkedIn and GitHub are already extracted.
 * Matches common TLDs only to avoid false positives.
 */
export const PORTFOLIO =
  /(?:https?:\/\/)?(?:www\.)?[\w\-]{2,}\.(?:com|io|dev|me|co|net|org|tech)(?:\/[\w\-./]*)?/i;

// ─── Location ─────────────────────────────────────────────────────────────────

/**
 * "City, State" or "City, Country" — e.g. "San Francisco, CA" | "Mumbai, India".
 * Deliberately lenient; used as a first-pass heuristic only.
 */
export const LOCATION = /[A-Z][a-zA-Z\s]+,\s*[A-Z][a-zA-Z\s]{1,30}/;

// ─── Section headers ──────────────────────────────────────────────────────────

/**
 * Matches common resume section header labels.
 * Used to split the resume text into logical blocks.
 * Case-insensitive; anchored at start of a line (multiline).
 */
export const SECTION_HEADER =
  /^(education|experience|work experience|employment|skills?|technical skills?|projects?|certifications?|achievements?|publications?|summary|objective|profile|interests?|languages?|references?)\s*:?\s*$/im;

// ─── Education block ──────────────────────────────────────────────────────────

/** Year — 4-digit year between 1960 and 2035 */
export const YEAR = /\b(19[6-9]\d|20[0-3]\d)\b/g;

/** Degree keyword (broad) */
export const DEGREE =
  /\b(b\.?tech|m\.?tech|b\.?e|m\.?e|b\.?sc|m\.?sc|phd|ph\.d|bachelor|master|mba|bca|mca|b\.?a|m\.?a|b\.?com|m\.?com)\b/i;

/** CGPA / GPA — e.g. 8.5 CGPA | GPA: 3.9 */
export const GPA = /(?:cgpa|gpa)\s*:?\s*(\d(?:\.\d{1,2})?)/i;

// ─── Experience block ─────────────────────────────────────────────────────────

/** Date range commonly seen in work experience sections */
export const DATE_RANGE =
  /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d{4}\s*(?:–|-|to)\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d{4}|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d{4}\s*(?:–|-|to)\s*(?:present|current|now)/i;
