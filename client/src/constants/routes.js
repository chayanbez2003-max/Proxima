/**
 * routes.js
 * Single source of truth for all client-side route paths.
 *
 * IMPORTANT: ROUTES values with `:param` segments are React Router
 * *patterns* — they are used in <Route path={...}> declarations.
 * For programmatic navigation use the builder helpers below, not the
 * pattern strings directly.
 *
 * Usage:
 *   <Route path={ROUTES.ANALYSIS} ...>   ← pattern (correct)
 *   navigate(buildAnalysisPath(id))       ← real URL (correct)
 *   navigate(ROUTES.ANALYSIS)             ← BUG: produces "/analysis/:id"
 */
export const ROUTES = {
  HOME:      "/",
  SIGN_IN:   "/sign-in",
  SIGN_UP:   "/sign-up",
  UPLOAD:    "/upload",
  DASHBOARD: "/dashboard",
  ANALYSIS:  "/analysis/:id",  // React Router pattern — do NOT use in navigate()
  NOT_FOUND: "*",
};


/**
 * buildAnalysisPath
 * Produces a real navigable URL for the analysis report page.
 * @param {string} id - MongoDB ObjectId string
 * @returns {string}  e.g. "/analysis/64f2a..."
 */
export const buildAnalysisPath = (id) => `/analysis/${id}`;
