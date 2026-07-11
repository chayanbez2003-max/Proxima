import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import MainLayout   from "../../components/layout/MainLayout.jsx";
import ResumeCard   from "../../components/upload/ResumeCard.jsx";
import SkillGapCard from "../../components/upload/SkillGapCard.jsx";
import { useAnalysis } from "../../hooks/useAnalysis.js";
import { ROUTES }      from "../../constants/routes.js";

// ─── Spinner ──────────────────────────────────────────────────────────────────
const Spinner = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-32">
    <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
    <p className="text-sm text-white/40">Loading analysis…</p>
  </div>
);

// ─── Role selector panel ───────────────────────────────────────────────────────
const RoleSelector = ({
  jobRoles, selectedRole, setSelectedRole,
  isMatching, onMatch, onReset, matchResult,
}) => {
  const rolesByCategory = jobRoles.reduce((acc, { role, category }) => {
    if (!acc[category]) acc[category] = [];
    acc[category].push(role);
    return acc;
  }, {});

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
        <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">
          Career Intelligence
        </span>
      </div>

      <div className="space-y-2">
        <label htmlFor="role-select" className="text-xs text-white/40 uppercase tracking-widest block">
          Target Job Role
        </label>
        <div className="relative">
          <select
            id="role-select"
            value={selectedRole}
            onChange={(e) => { setSelectedRole(e.target.value); onReset(); }}
            disabled={isMatching}
            className="w-full rounded-xl border border-white/10 bg-white/[0.05] text-white text-sm px-4 py-3 pr-10 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all appearance-none cursor-pointer disabled:opacity-50"
          >
            <option value="" className="bg-[#0d0d1a] text-white/50">— Select a role —</option>
            {Object.entries(rolesByCategory).sort().map(([category, roles]) => (
              <optgroup key={category} label={category} className="bg-[#0d0d1a] font-semibold">
                {roles.sort().map((role) => (
                  <option key={role} value={role} className="bg-[#0d0d1a] font-normal">
                    {role}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {/* Custom chevron */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <button
        id="match-skills-btn"
        onClick={onMatch}
        disabled={!selectedRole || isMatching}
        className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/15"
      >
        {isMatching ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Analysing Skills…
          </>
        ) : matchResult ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Re-analyse
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Analyse Skills
          </>
        )}
      </button>

      {matchResult && (
        <p className="text-xs text-white/25 text-center">
          Analysed against <span className="text-white/40">{matchResult.selectedRole}</span>
        </p>
      )}
    </div>
  );
};

// ─── Placement Readiness Score Card ───────────────────────────────────────────
const PlacementReadinessCard = ({ matchResult }) => {
  if (!matchResult) return null;

  const {
    matchPercentage = 0,
    missingSkills = {},
    totalRequired = 0,
    totalMatched = 0,
    totalMissing = 0,
  } = matchResult;

  const flattenSkills = (skillsObj) => {
    return Object.values(skillsObj || {}).flat();
  };

  const prioritySkills = flattenSkills(missingSkills).slice(0, 4);

  const skillCoverage =
    totalRequired > 0 ? Math.round((totalMatched / totalRequired) * 100) : 0;

  const readinessScore = Math.round(
    matchPercentage * 0.7 + skillCoverage * 0.3
  );

  const getReadinessLevel = (score) => {
    if (score >= 90) {
      return {
        label: "Strong Candidate",
        color: "text-emerald-300",
        bg: "bg-emerald-500",
      };
    }

    if (score >= 75) {
      return {
        label: "Placement Ready",
        color: "text-green-300",
        bg: "bg-green-500",
      };
    }

    if (score >= 60) {
      return {
        label: "Improving",
        color: "text-yellow-300",
        bg: "bg-yellow-500",
      };
    }

    if (score >= 40) {
      return {
        label: "Needs Improvement",
        color: "text-orange-300",
        bg: "bg-orange-500",
      };
    }

    return {
      label: "Beginner",
      color: "text-red-300",
      bg: "bg-red-500",
    };
  };

  const level = getReadinessLevel(readinessScore);

  return (
    <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] backdrop-blur-sm p-6 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">
              Placement Readiness
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {readinessScore}% Ready
          </h3>

          <p className={`text-sm font-medium mt-1 ${level.color}`}>
            {level.label}
          </p>
        </div>

        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.04]">
          <span className="text-xl font-bold text-white">
            {readinessScore}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-white/40">
          <span>Readiness Progress</span>
          <span>{readinessScore}%</span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full ${level.bg}`}
            style={{ width: `${readinessScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
          <p className="text-xs text-white/35 mb-1">Role Match</p>
          <p className="text-lg font-bold text-white">{matchPercentage}%</p>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
          <p className="text-xs text-white/35 mb-1">Matched</p>
          <p className="text-lg font-bold text-emerald-400">{totalMatched}</p>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
          <p className="text-xs text-white/35 mb-1">Missing</p>
          <p className="text-lg font-bold text-rose-400">{totalMissing}</p>
        </div>
      </div>

      {prioritySkills.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-white/40 uppercase tracking-widest">
            Priority Skills to Improve
          </p>

          <div className="flex flex-wrap gap-2">
            {prioritySkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs text-orange-200 bg-orange-500/10 border border-orange-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-white/30 leading-relaxed">
        This score estimates how ready the candidate is for the selected role
        based on role match, matched skills, and missing skill gaps.
      </p>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

/**
 * AnalysisPage
 *
 * /analysis/:id
 *
 * Layout (desktop two-column, mobile stacked):
 *  Left col  → ResumeCard (candidate info + detected skills)
 *  Right col → Role selector + SkillGapCard (career intelligence report)
 */
const AnalysisPage = () => {
  const { id }  = useParams();
  const navigate = useNavigate();

  const {
    parsedData, isFetching, fetchError,
    jobRoles, rolesError, isFetchingRoles, retryRoles,
    selectedRole, setSelectedRole,
    isMatching, matchResult, matchError, handleMatch, resetMatch,
  } = useAnalysis(id);

  // Toast side-effects
  useEffect(() => {
    if (parsedData && !isFetching) {
      const name = parsedData.candidateName || "Resume";
      toast.success(`${name} — ready for analysis!`, { duration: 3500 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  useEffect(() => {
    if (matchResult) toast.success("Skill gap analysis complete!", { duration: 3000 });
  }, [matchResult]);

  useEffect(() => {
    if (matchError) toast.error(matchError, { duration: 5000 });
  }, [matchError]);

  // ── Error state ─────────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-6 px-6 text-center">
          <div className="text-5xl">⚠️</div>
          <h2 className="text-xl font-bold text-white">Analysis Not Found</h2>
          <p className="text-white/40 text-sm max-w-sm">{fetchError}</p>
          <Link
            to={ROUTES.UPLOAD}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all"
          >
            Upload a New Resume
          </Link>
        </div>
      </MainLayout>
    );
  }

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

      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/4 blur-3xl" />
        </div>

        {isFetching ? (
          <Spinner />
        ) : (
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

            {/* ── Page header ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <button
                    onClick={() => navigate(ROUTES.UPLOAD)}
                    className="text-white/30 hover:text-white/70 transition-colors text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Upload
                  </button>
                  <span className="text-white/15">/</span>
                  <span className="text-sm text-white/50">Analysis Report</span>
                </div>
                <h1 className="text-2xl font-bold text-white">
                  {parsedData?.candidateName
                    ? `${parsedData.candidateName}'s Analysis`
                    : "Resume Analysis"}
                </h1>
                <p className="text-xs text-white/30 mt-1">
                  ID: {id}
                </p>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-300 font-medium">Parsed</span>
              </div>
            </motion.div>

            {/* ── Two-column grid ──────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

              {/* ── LEFT: Resume Summary ─────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {parsedData && (
                  <ResumeCard result={parsedData} compact />
                )}
              </motion.div>

              {/* ── RIGHT: Intelligence panel ─────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="space-y-5"
              >
                {/* ── Career Intelligence panel ──────────────── */}
                {/* Loading roles */}
                {isFetchingRoles && (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                    <div className="w-4 h-4 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
                    <span className="text-sm text-white/40">Loading job roles…</span>
                  </div>
                )}

                {/* Roles fetch error + retry */}
                {!isFetchingRoles && rolesError && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-xs font-semibold text-red-300 uppercase tracking-widest">Career Intelligence</span>
                    </div>
                    <p className="text-sm text-white/50">{rolesError}</p>
                    <button
                      onClick={retryRoles}
                      className="text-xs font-medium text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Role selector — only shown once roles are loaded */}
                {!isFetchingRoles && !rolesError && jobRoles.length > 0 && (
                  <RoleSelector
                    jobRoles={jobRoles}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    isMatching={isMatching}
                    onMatch={handleMatch}
                    onReset={resetMatch}
                    matchResult={matchResult}
                  />
                )}

                {/* Skill gap result */}
                <AnimatePresence>
                  {matchResult && (
                    <motion.div
                      key="skill-gap"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45 }}
                    >
                      <SkillGapCard matchResult={matchResult} />
                    <PlacementReadinessCard matchResult={matchResult} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Placeholder when no match run yet */}
                {!matchResult && !isMatching && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-2xl border border-dashed border-white/10 p-10 text-center space-y-3"
                  >
                    <div className="text-4xl">🎯</div>
                    <p className="text-sm font-medium text-white/50">
                      Select a job role above to start the Career Intelligence analysis
                    </p>
                    <p className="text-xs text-white/25">
                      We'll compare your skills, find gaps, and show what you need to reach your goal.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AnalysisPage;
