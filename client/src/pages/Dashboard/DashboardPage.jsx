import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../../components/layout/MainLayout.jsx";
import {ROUTES,buildAnalysisPath,buildSavedCareerReportPath,} from "../../constants/routes.js";
import axiosInstance from "../../api/axiosInstance.js";
import { getUserCareerReportsService } from "../../api/careerReport.api.js";

// ── Helpers ───────────────────────────────────────────────────────────────────

const statusConfig = {
  uploaded:  { label: "Uploaded",  color: "text-yellow-300", dot: "bg-yellow-400" },
  parsed:    { label: "Parsed",    color: "text-emerald-300", dot: "bg-emerald-400" },
  analyzed:  { label: "Analyzed",  color: "text-indigo-300",  dot: "bg-indigo-400" },
  failed:    { label: "Failed",    color: "text-red-300",     dot: "bg-red-400" },
};

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });

// ── Sub-components ────────────────────────────────────────────────────────────

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center gap-6 py-32 text-center"
  >
    <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-4xl">
      📄
    </div>
    <div className="space-y-2">
      <h2 className="text-xl font-bold text-white">No analyses yet</h2>
      <p className="text-white/40 text-sm max-w-xs">
        Upload your first resume and Proxima will analyse your career readiness.
      </p>
    </div>
    <Link
      to={ROUTES.UPLOAD}
      className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20"
    >
      Upload Your First Resume
      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </Link>
  </motion.div>
);

const AnalysisCard = ({ analysis, index }) => {
  const cfg = statusConfig[analysis.status] ?? statusConfig.uploaded;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link
        to={buildAnalysisPath(analysis._id)}
        className="group block rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 backdrop-blur-sm p-5 transition-all"
      >
        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <p className="text-sm font-semibold text-white truncate">
              {analysis.candidateName || analysis.originalFileName}
            </p>
            {analysis.originalFileName && analysis.candidateName && (
              <p className="text-xs text-white/30 truncate">{analysis.originalFileName}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Status pill */}
              <span className={`flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </span>
              {/* Selected role */}
              {analysis.selectedRole && (
                <span className="text-xs text-white/30">
                  {analysis.selectedRole}
                </span>
              )}
              {/* Date */}
              <span className="text-xs text-white/20">{fmt(analysis.createdAt)}</span>
            </div>
          </div>

          {/* Right — match % badge */}
          <div className="flex-shrink-0 flex flex-col items-end gap-1">
            {analysis.matchPercentage !== null && analysis.matchPercentage !== undefined ? (
              <div className="flex flex-col items-center px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <span className="text-lg font-bold text-indigo-300">{analysis.matchPercentage}%</span>
                <span className="text-[10px] text-indigo-400/70 uppercase tracking-widest">Match</span>
              </div>
            ) : (
              <div className="px-3 py-2 rounded-xl border border-dashed border-white/10 text-xs text-white/20 text-center">
                Not<br />analysed
              </div>
            )}
            {/* Chevron */}
            <svg
              className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors mt-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CareerReportCard = ({ report, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link
        to={buildSavedCareerReportPath(report._id)}
        className="group block rounded-2xl border border-violet-500/10 bg-violet-500/[0.04] hover:bg-violet-500/[0.08] hover:border-violet-500/20 backdrop-blur-sm p-5 transition-all"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-1.5">
            <p className="text-sm font-semibold text-white truncate">
              {report.targetRole} Career Report
            </p>

            <p className="text-xs text-white/30">
              Saved on {fmt(report.createdAt)}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-xs text-emerald-300">
                Match: {report.matchPercentage ?? 0}%
              </span>

              <span className="text-xs text-violet-300">
                Readiness: {report.readinessScore ?? 0}%
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2 text-xs text-violet-300 group-hover:text-violet-200 transition-colors">
            View Report
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────

/**
 * DashboardPage
 *
 * /dashboard
 *
 * Displays the authenticated user's resume analysis history.
 * Fetches from GET /api/analysis/user — always scoped to the signed-in user.
 */
const DashboardPage = () => {
  const { user } = useUser();
  const [analyses, setAnalyses] = useState([]);
  const [careerReports, setCareerReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [analysisRes, reportsRes] = await Promise.all([
  axiosInstance.get("/analysis/user"),
  getUserCareerReportsService(),
]);

if (!cancelled) {
  setAnalyses(analysisRes.data.data ?? []);
  setCareerReports(reportsRes.reports ?? []);
}
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load your analyses.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <MainLayout>
      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/4 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">

          {/* ── Page header ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-2xl font-bold text-white">
                {user?.firstName ? `${user.firstName}'s Dashboard` : "Dashboard"}
              </h1>
              <p className="text-xs text-white/30 mt-1">
                Your resume analysis history
              </p>
            </div>

            <Link
              to={ROUTES.UPLOAD}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/15"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Analysis
            </Link>
          </motion.div>

          {/* ── Content ──────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {isLoading && (
              <div className="flex items-center justify-center py-32 gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
                <span className="text-sm text-white/40">Loading your analyses…</span>
              </div>
            )}

            {!isLoading && error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center space-y-3">
                <p className="text-sm text-white/50">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
                >
                  Retry
                </button>
              </div>
            )}

            {!isLoading && !error && analyses.length === 0 && <EmptyState />}

            {!isLoading && !error && analyses.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {/* Previous Career Reports */}
              {careerReports.length > 0 && (
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-white">
                        Previous Career Reports
                      </h2>
                      <p className="text-xs text-white/30 mt-1">
                        {careerReports.length} saved{" "}
                        {careerReports.length === 1 ? "report" : "reports"}
                      </p>
                    </div>
                  </div>

                  {careerReports.map((report, i) => (
                    <CareerReportCard key={report._id} report={report} index={i} />
                  ))}
                </div>
              )}

              {/* Resume Analyses */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Resume Analyses
                  </h2>
                  <p className="text-xs text-white/30 mt-1">
                    {analyses.length} {analyses.length === 1 ? "analysis" : "analyses"}
                  </p>
                </div>
              </div>

              {analyses.map((analysis, i) => (
                <AnalysisCard key={analysis._id} analysis={analysis} index={i} />
              ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
