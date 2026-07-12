import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout.jsx";
import SkillGapCard from "../../components/upload/SkillGapCard.jsx";
import PlacementReadinessCard from "../../components/career/PlacementReadinessCard.jsx";
import LearningPathCard from "../../components/career/LearningPathCard.jsx";
import { getCareerReportByIdService } from "../../api/careerReport.api.js";
import { ROUTES } from "../../constants/routes.js";
import LearningProgressTracker from "../../components/career/LearningProgressTracker.jsx";

const SavedCareerReportPage = () => {
  const { reportId } = useParams();

  const [reportMeta, setReportMeta] = useState(null);
  const [fullReport, setFullReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadSavedReport = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCareerReportByIdService(reportId);

        if (!cancelled) {
          setReportMeta(data.report);
          setFullReport(data.fullReport);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load saved career report.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadSavedReport();

    return () => {
      cancelled = true;
    };
  }, [reportId]);

  const matchResult = fullReport?.reportData;

  return (
    <MainLayout>
      <div className="relative min-h-[calc(100vh-4rem)] px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <Link
              to={ROUTES.DASHBOARD}
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="text-2xl font-bold text-white mt-4">
              Saved Career Report
            </h1>

            <p className="text-sm text-white/40 mt-1">
              Target Role:{" "}
              <span className="text-violet-300">
                {reportMeta?.targetRole || fullReport?.targetRole || "Career Report"}
              </span>
            </p>

            {reportMeta?.createdAt && (
              <p className="text-xs text-white/30 mt-2">
                Saved on {new Date(reportMeta.createdAt).toLocaleDateString("en-IN")}
              </p>
            )}
          </div>

          {isLoading && (
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
              <p className="text-white/50 text-sm">Loading saved report...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {!isLoading && !error && matchResult && (
            <div className="space-y-6">
              <LearningProgressTracker reportId={reportId} />
              <SkillGapCard matchResult={matchResult} />
              <PlacementReadinessCard matchResult={matchResult} />
              <LearningPathCard matchResult={matchResult} />
            </div>
          )}

          {!isLoading && !error && !matchResult && (
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-8">
              <p className="text-yellow-300 text-sm">
                Saved report data is missing or invalid.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SavedCareerReportPage;