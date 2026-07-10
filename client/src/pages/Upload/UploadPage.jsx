import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import MainLayout     from "../../components/layout/MainLayout.jsx";
import DropZone       from "../../components/upload/DropZone.jsx";
import UploadProgress from "../../components/upload/UploadProgress.jsx";
import { useResumeUpload } from "../../hooks/useResumeUpload.js";

/**
 * UploadPage
 *
 * Responsibility: accept a PDF, upload it, redirect to /analysis/:id.
 * The analysis report lives exclusively on AnalysisPage.
 */
const UploadPage = () => {
  const { file, setFile, progress, isUploading, error, handleUpload, reset } =
    useResumeUpload();

  useEffect(() => {
    if (error) toast.error(error, { duration: 5000 });
  }, [error]);

  return (
    <MainLayout>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a2e",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      />

      <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden px-6">

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-600/5 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-medium text-indigo-300 tracking-widest uppercase">
                AI Resume Analyser
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Upload Your Resume
            </h1>
            <p className="text-white/40 text-sm mt-2">
              PDF only · Max 5 MB · Results on the next page
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-7 space-y-5">

            <DropZone file={file} onFileSelect={setFile} isUploading={isUploading} />

            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <UploadProgress progress={progress} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <button
                id="analyze-resume-btn"
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
              >
                {isUploading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Parsing Resume…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Analyse Resume
                  </>
                )}
              </button>

              {file && !isUploading && (
                <button
                  onClick={reset}
                  className="px-4 py-3.5 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/5 border border-white/5 transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-white/20">
            Your file is processed temporarily and deleted immediately after analysis.
          </p>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default UploadPage;
