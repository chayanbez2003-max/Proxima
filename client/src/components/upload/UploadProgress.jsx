import { motion } from "framer-motion";

/**
 * UploadProgress
 * Animated progress bar shown while the file uploads to the server.
 *
 * @param {number} progress - 0–100
 */
const UploadProgress = ({ progress }) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-xs text-white/40">
        <span>Uploading…</span>
        <span>{progress}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;
