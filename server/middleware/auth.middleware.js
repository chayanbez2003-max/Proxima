import { clerkMiddleware, getAuth } from "@clerk/express";

/**
 * clerkAuthMiddleware
 *
 * Mounts the Clerk session verification middleware globally.
 * This adds `req.auth` to every request (with clerkUserId, sessionId, etc.)
 * It does NOT block unauthenticated requests on its own — it only validates
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
 * Uses getAuth(req) — the current Clerk-recommended pattern — instead of
 * the deprecated requireAuth factory, which caused a hang because exporting
 * the factory unwrapped meant Express called requireAuth(req, res, next)
 * treating req as options, silently returning a middleware that was never
 * executed, so next() was never called.
 *
 * Usage in routes:
 *   router.post("/resume", requireAuthMiddleware, uploadResumeMiddleware, uploadResume);
 *
 * req.auth.userId is the authenticated user's Clerk ID after this middleware runs.
 */
export const requireAuthMiddleware = (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized. Please sign in." });
  }
  next();
};
