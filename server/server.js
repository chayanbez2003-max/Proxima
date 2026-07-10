import "dotenv/config";
import app              from "./app.js";
import connectDB        from "./config/db.js";
import { seedJobRoles } from "./database/seedJobRoles.js";

/**
 * server.js
 * Entry point — connects to MongoDB, then starts the HTTP server.
 * All Express configuration lives in app.js.
 */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedJobRoles();

    app.listen(PORT, () => {
      console.log(`🚀 Proxima server running on http://localhost:${PORT}`);
      console.log(`   Environment : ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
