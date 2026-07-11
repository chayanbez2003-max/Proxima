import { clerkMiddleware, getAuth } from "@clerk/express";

/**
 * Adds Clerk auth data to req.
 * This should be mounted globally in app.js.
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
