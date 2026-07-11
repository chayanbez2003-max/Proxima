import { clerkMiddleware, getAuth } from "@clerk/express";

/**
 * clerkAuthMiddleware
 *
 * Mounts the Clerk session verification middleware globally.
 * This adds req.auth (a getter function) to every request.
 * It does NOT block unauthenticated requests — it only validates
 * the session token IF one is present.
 *
 * Used once in app.js, before all routes.
 */
export const clerkAuthMiddleware = clerkMiddleware();

/**
 * requireAuthMiddleware
 *
 * Blocks unauthenticated access to a route.
 * Returns 401 JSON if no valid Clerk session token is found.
 *
 * WHY NOT `export { requireAuth as requireAuthMiddleware }`:
 *   requireAuth is a FACTORY — requireAuth() returns the middleware.
 *   Exporting it bare means Express calls requireAuth(req, res, next),
 *   treating req as the options argument. The factory returns a new
 *   middleware function silently — next() is NEVER called — request hangs.
 *
 * WHY getAuth(req) and not req.auth?.userId:
 *   In @clerk/express v2, req.auth is a callable FUNCTION, not an object.
 *   req.auth?.userId reads .userId on the function object → always undefined.
 *   getAuth(req) is the documented API that returns the auth object.
 *
 * Usage in routes:
 *   router.post("/resume", requireAuthMiddleware, uploadResumeMiddleware, uploadResume);
 */
export const requireAuthMiddleware = (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized. Please sign in." });
  }
  next();
};
