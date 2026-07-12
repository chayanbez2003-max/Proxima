import { useEffect, useState } from "react";
import {
  getLearningProgressService,
  updateLearningSkillStatusService,
} from "../../api/learningProgress.api.js";

const LearningProgressTracker = ({ reportId }) => {
  const [progress, setProgress] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingSkill, setUpdatingSkill] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadProgress = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getLearningProgressService(reportId);

        if (!cancelled) {
          setProgress(data.progress);
          setStats(data.stats);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load learning progress.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    if (reportId) {
      loadProgress();
    }

    return () => {
      cancelled = true;
    };
  }, [reportId]);

  const handleToggleSkill = async (skillItem) => {
    const nextStatus =
      skillItem.status === "completed" ? "not_started" : "completed";

    setUpdatingSkill(skillItem.skill);
    setError(null);

    try {
      const data = await updateLearningSkillStatusService({
        reportId,
        skill: skillItem.skill,
        status: nextStatus,
      });

      setProgress(data.progress);
      setStats(data.stats);
    } catch (err) {
      setError(err.message || "Failed to update skill progress.");
    } finally {
      setUpdatingSkill(null);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
        <p className="text-sm text-white/50">Loading learning progress...</p>
      </div>
    );
  }

  if (error && !progress) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
        <p className="text-sm text-red-300">{error}</p>
      </div>
    );
  }

  if (!progress || progress.skills.length === 0) {
    return (
      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
        <p className="text-sm text-yellow-300">
          No missing skills found for this report.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.03] backdrop-blur-sm p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-widest">
              Learning Progress Tracker
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {stats?.completedSkills || 0}/{stats?.totalSkills || 0} Skills Completed
          </h3>

          <p className="text-sm text-white/40 mt-1">
            Estimated readiness improves as you complete missing skills.
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-white/35">Estimated Readiness</p>
          <p className="text-2xl font-bold text-cyan-300">
            {progress.currentReadinessScore || 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
          <p className="text-xs text-white/35 mb-1">Progress</p>
          <p className="text-lg font-bold text-white">
            {stats?.progressPercentage || 0}%
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
          <p className="text-xs text-white/35 mb-1">Base Readiness</p>
          <p className="text-lg font-bold text-white">
            {progress.baseReadinessScore || 0}%
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
          <p className="text-xs text-white/35 mb-1">Next Skill</p>
          <p className="text-sm font-semibold text-cyan-300 truncate">
            {stats?.nextSkill || "All skills completed"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-white/40">
          <span>Skill Completion</span>
          <span>{stats?.progressPercentage || 0}%</span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-cyan-400"
            style={{ width: `${stats?.progressPercentage || 0}%` }}
          />
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-300">
          {error}
        </p>
      )}

      <div className="space-y-3">
        <p className="text-xs text-white/40 uppercase tracking-widest">
          Skill Checklist
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {progress.skills.map((skillItem) => {
            const isCompleted = skillItem.status === "completed";
            const isUpdating = updatingSkill === skillItem.skill;

            return (
              <button
                key={skillItem.skill}
                type="button"
                onClick={() => handleToggleSkill(skillItem)}
                disabled={isUpdating}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] px-4 py-3 text-left transition-all disabled:opacity-60"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs ${
                      isCompleted
                        ? "bg-cyan-400 border-cyan-400 text-black"
                        : "border-white/20 text-white/30"
                    }`}
                  >
                    {isCompleted ? "✓" : ""}
                  </span>

                  <span
                    className={`text-sm ${
                      isCompleted
                        ? "text-white line-through decoration-white/30"
                        : "text-white/80"
                    }`}
                  >
                    {skillItem.skill}
                  </span>
                </div>

                <span className="text-xs text-white/30">
                  {isUpdating
                    ? "Updating..."
                    : isCompleted
                    ? "Completed"
                    : "Mark done"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-white/30 leading-relaxed">
        This readiness score is an estimate based on completed skills from the
        generated learning path. Later, it can be improved using quizzes,
        projects, or GitHub proof validation.
      </p>
    </div>
  );
};

export default LearningProgressTracker;