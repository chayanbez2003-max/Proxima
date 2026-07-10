import { motion, AnimatePresence } from "framer-motion";

// ─── Category labels (client-side) ────────────────────────────────────────────
const CATEGORY_LABELS = {
  programmingLanguages: "Programming Languages",
  frontend:             "Frontend",
  backend:              "Backend",
  databases:            "Databases",
  cloud:                "Cloud",
  devops:               "DevOps",
  versionControl:       "Version Control",
  testing:              "Testing",
  mobile:               "Mobile",
  aiMl:                 "AI / ML",
  tools:                "Tools",
  operatingSystems:     "Operating Systems",
  softSkills:           "Soft Skills",
  concepts:             "Concepts",
  others:               "Others",
};

// ─── Match percentage ring ─────────────────────────────────────────────────────
const MatchRing = ({ percentage }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const filled = (percentage / 100) * circumference;

  const color =
    percentage >= 70 ? "#34d399" :   // emerald
    percentage >= 40 ? "#f59e0b" :   // amber
                       "#f87171";    // red

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="104" height="104" viewBox="0 0 104 104">
        {/* Track */}
        <circle cx="52" cy="52" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        {/* Fill */}
        <circle
          cx="52" cy="52" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - filled}
          transform="rotate(-90 52 52)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="52" y="52" textAnchor="middle" dominantBaseline="middle"
          fill="white" fontSize="18" fontWeight="bold">
          {percentage}%
        </text>
      </svg>
      <p className="text-xs text-white/40">Match Score</p>
    </div>
  );
};

// ─── Skill badge ───────────────────────────────────────────────────────────────
const Badge = ({ skill, variant }) => {
  const styles = {
    matched: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
    missing: "bg-rose-500/10 text-rose-300 border-rose-500/25",
    extra:   "bg-sky-500/10 text-sky-300 border-sky-500/25",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${styles[variant] || styles.extra}`}>
      {skill}
    </span>
  );
};

// ─── Category skill group ──────────────────────────────────────────────────────
const CategoryGroup = ({ categoryKey, skills, variant }) => {
  if (!skills || skills.length === 0) return null;
  const label = CATEGORY_LABELS[categoryKey] || categoryKey;
  return (
    <div>
      <p className="text-xs text-white/30 mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <Badge key={skill} skill={skill} variant={variant} />
        ))}
      </div>
    </div>
  );
};

// ─── Skill section ─────────────────────────────────────────────────────────────
const SkillSection = ({ title, icon, skillsObj, variant, emptyMsg }) => {
  const categories = Object.entries(skillsObj || {});
  const hasSkills = categories.some(([, arr]) => arr && arr.length > 0);

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <h3 className="text-sm font-semibold text-white/80">{title}</h3>
        <span className="ml-auto text-xs text-white/30">
          {categories.reduce((sum, [, arr]) => sum + (arr?.length || 0), 0)} skills
        </span>
      </div>
      {hasSkills ? (
        <div className="space-y-2.5">
          {categories.map(([cat, skills]) => (
            <CategoryGroup key={cat} categoryKey={cat} skills={skills} variant={variant} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-white/25 italic">{emptyMsg}</p>
      )}
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────

/**
 * SkillGapCard
 *
 * Displays the M3 Career Intelligence result below the ResumeCard.
 * Shows: match ring, matched / missing / extra skills grouped by category.
 *
 * @param {{ matchResult: Object }} props
 */
const SkillGapCard = ({ matchResult }) => {
  if (!matchResult) return null;

  const {
    selectedRole, roleCategory, matchPercentage,
    matchedSkills, missingSkills, extraSkills,
    totalRequired, totalMatched, totalMissing,
  } = matchResult;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="w-full space-y-4"
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-medium text-violet-300 uppercase tracking-widest">
            Career Intelligence
          </span>
        </div>
      </div>

      {/* ── Main card ────────────────────────────────────────── */}
      <div className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6 space-y-6">

        {/* Role + ring */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-white">{selectedRole}</p>
            <p className="text-xs text-white/40 mt-0.5">{roleCategory}</p>

            {/* Stats row */}
            <div className="flex gap-4 mt-3">
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-400">{totalMatched}</p>
                <p className="text-xs text-white/30">Matched</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-rose-400">{totalMissing}</p>
                <p className="text-xs text-white/30">Missing</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-sky-400">{totalRequired}</p>
                <p className="text-xs text-white/30">Required</p>
              </div>
            </div>
          </div>
          <MatchRing percentage={matchPercentage} />
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-white/30 mb-1.5">
            <span>Skill Coverage</span>
            <span>{matchPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${matchPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Matched Skills */}
        <SkillSection
          title="Matched Skills"
          icon="✅"
          skillsObj={matchedSkills}
          variant="matched"
          emptyMsg="None of your extracted skills matched the role requirements."
        />

        {/* Missing Skills */}
        <SkillSection
          title="Missing Skills"
          icon="🎯"
          skillsObj={missingSkills}
          variant="missing"
          emptyMsg="You already have all required skills for this role!"
        />

        {/* Extra Skills */}
        <AnimatePresence>
          {Object.values(extraSkills || {}).some((arr) => arr?.length > 0) && (
            <SkillSection
              title="Bonus Skills"
              icon="⭐"
              skillsObj={extraSkills}
              variant="extra"
              emptyMsg=""
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SkillGapCard;
