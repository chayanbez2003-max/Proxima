import mongoose from "mongoose";

/**
 * connectDB
 * Establishes the Mongoose connection to MongoDB.
 * Exits the process on failure so the server never starts
 * in a broken state.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
