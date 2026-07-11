import { clerkMiddleware, requireAuth } from "@clerk/express";

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
 * Returns 401 if no valid Clerk session token is found.
 *
 * Usage in routes:
 *   router.post("/resume", requireAuthMiddleware, uploadResumeMiddleware, uploadResume);
 *
 * req.auth.userId is the authenticated user's Clerk ID after this middleware runs.
 */
export { requireAuth as requireAuthMiddleware };
