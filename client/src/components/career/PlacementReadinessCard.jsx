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

export default PlacementReadinessCard;