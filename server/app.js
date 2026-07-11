import express  from "express";
import cors     from "cors";
import morgan   from "morgan";
import helmet   from "helmet";
import corsOptions              from "./config/corsOptions.js";
import apiRouter                from "./routes/index.js";
import { globalErrorHandler }  from "./middleware/error.middleware.js";
import { clerkAuthMiddleware } from "./middleware/auth.middleware.js";

/**
 * app.js
 * Express application factory.
 * Separating app from server.js makes the application
 * independently testable without binding a port.
 */
const app = express();

// ── Core middleware ────────────────────────────────────────
app.use(helmet()); // Security headers (X-Content-Type-Options, HSTS, etc.)
app.use(cors(corsOptions));
app.use(clerkAuthMiddleware); // Parses Clerk session tokens on every request
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// HTTP request logger (dev = colourised, production = combined)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ── Health check ──────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", environment: process.env.NODE_ENV });
});

// ── API routes ────────────────────────────────────────────
app.use("/api", apiRouter);

// ── 404 handler ───────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ── Global error handler (must be last) ───────────────────
app.use(globalErrorHandler);

export default app;
