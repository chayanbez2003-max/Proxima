import { clerkMiddleware, getAuth } from "@clerk/express";

/**
 * Adds Clerk auth data to req.
 * This should be mounted globally in app.js before API routes.
 */
export const clerkAuthMiddleware = clerkMiddleware();

/**
 * API-friendly auth middleware.
 * Returns JSON 401 instead of redirecting or hanging API requests.
 */
export const requireAuthMiddleware = (req, res, next) => {
  const auth = getAuth(req);

  if (!auth?.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please sign in first.",
    });
  }

  req.auth = auth;
  next();
};