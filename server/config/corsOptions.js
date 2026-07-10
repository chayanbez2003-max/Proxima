/**
 * corsOptions
 * CORS configuration for the Express app.
 * CLIENT_URL is read from .env so it works across environments
 * without code changes.
 */
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOptions;
