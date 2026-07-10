import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { APP_CONFIG } from "../../constants/appConfig.js";

/**
 * DropZone
 *
 * Drag-and-drop PDF upload area.
 * Delegates all state management to the parent via onFileSelect.
 *
 * @param {File|null}  file           - Currently selected file (controlled)
 * @param {Function}   onFileSelect   - Called with File when a file is accepted
 * @param {boolean}    isUploading    - Disables the zone while upload is in progress
 */
const DropZone = ({ file, onFileSelect, isUploading }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept:   APP_CONFIG.ACCEPTED_TYPES,
    maxFiles: 1,
    maxSize:  APP_CONFIG.MAX_FILE_SIZE_MB * 1024 * 1024,
    disabled: isUploading,
  });

  // ── Dynamic border colour ──────────────────────────────
  const borderColor = isDragReject
    ? "border-red-500/70"
    : isDragActive
    ? "border-indigo-500/70"
    : file
    ? "border-emerald-500/50"
    : "border-white/10 hover:border-white/20";

  const bgColor = isDragReject
    ? "bg-red-500/5"
    : isDragActive
    ? "bg-indigo-500/5"
    : "bg-white/[0.02]";

  return (
    <div
      {...getRootProps()}
      className={`
        relative cursor-pointer rounded-2xl border-2 border-dashed p-10
        transition-all duration-300 ${borderColor} ${bgColor}
        ${isUploading ? "pointer-events-none opacity-60" : ""}
      `}
    >
      <input {...getInputProps()} />

      <AnimatePresence mode="wait">
        {file ? (
          /* ── File selected state ─────────────────────── */
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            {/* PDF icon */}
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{file.name}</p>
              <p className="text-xs text-white/40 mt-0.5">
                {(file.size / 1024 / 1024).toFixed(2)} MB · Click or drag to replace
              </p>
            </div>
          </motion.div>
        ) : isDragActive ? (
          /* ── Drag over state ─────────────────────────── */
          <motion.div
            key="dragging"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-indigo-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-indigo-300 font-medium">Drop your PDF here</p>
          </motion.div>
        ) : (
          /* ── Idle state ──────────────────────────────── */
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div>
              <p className="text-white/60 text-sm">
                <span className="text-indigo-400 font-semibold">Click to browse</span>
                {" "}or drag &amp; drop your resume
              </p>
              <p className="text-white/30 text-xs mt-1">
                PDF only · Max {APP_CONFIG.MAX_FILE_SIZE_MB}MB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDragReject && (
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-red-400">
          Invalid file. Please use a PDF under {APP_CONFIG.MAX_FILE_SIZE_MB}MB.
        </p>
      )}
    </div>
  );
};

export default DropZone;
