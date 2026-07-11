import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout.jsx";
import SkillGapCard from "../../components/upload/SkillGapCard.jsx";
import { useAnalysis } from "../../hooks/useAnalysis.js";
import { buildAnalysisPath } from "../../constants/routes.js";
import PlacementReadinessCard from "../../components/career/PlacementReadinessCard.jsx";
import LearningPathCard from "../../components/career/LearningPathCard.jsx";
import { saveCareerReportService } from "../../api/careerReport.api.js";

const CareerIntelligencePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const selectedRoleFromUrl = searchParams.get("role") || "";

  const hasSavedReportRef = useRef(false);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [savedReportId, setSavedReportId] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const {
    isFetching,
    fetchError,
    isMatching,
    matchResult,
    matchError,
    handleMatchForRole,
  } = useAnalysis(id);

  useEffect(() => {
    if (selectedRoleFromUrl) {
      handleMatchForRole(selectedRoleFromUrl);
    }
  }, [selectedRoleFromUrl, handleMatchForRole]);

  useEffect(() => {
  if (!matchResult || !selectedRoleFromUrl || hasSavedReportRef.current) {
    return;
  }

  const saveReport = async () => {
    hasSavedReportRef.current = true;
    setSaveStatus("saving");
    setSaveError(null);

    try {
      const data = await saveCareerReportService({
        analysisId: id,
        targetRole: selectedRoleFromUrl,
        reportData: matchResult,
      });

      setSavedReportId(data?.report?._id || null);
      setSaveStatus("saved");
    } catch (error) {
      hasSavedReportRef.current = false;
      setSaveStatus("error");
      setSaveError(error.message || "Failed to save report.");
    }
  };

  saveReport();
}, [matchResult, selectedRoleFromUrl, id]);

  return (
    <MainLayout>
      <div className="relative min-h-[calc(100vh-4rem)] px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <Link
              to={buildAnalysisPath(id)}
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              ← Back to Resume Analysis
            </Link>

            <h1 className="text-2xl font-bold text-white mt-4">
              Career Intelligence Report
            </h1>

            <p className="text-sm text-white/40 mt-1">
              Target Role:{" "}
              <span className="text-violet-300">
                {selectedRoleFromUrl || "No role selected"}
              </span>
            </p>

            {saveStatus === "saving" && (
  <p className="text-xs text-yellow-300 mt-2">
    Saving report to MongoDB and AWS S3...
  </p>
)}

{saveStatus === "saved" && (
  <p className="text-xs text-emerald-300 mt-2">
    Report saved successfully.
    {savedReportId && (
      <span className="text-white/30"> ID: {savedReportId}</span>
    )}
  </p>
)}

{saveStatus === "error" && (
  <p className="text-xs text-red-300 mt-2">
    {saveError}
  </p>
)}
          </div>

          {isFetching && (
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
              <p className="text-white/50 text-sm">Loading resume analysis…</p>
            </div>
          )}

          {fetchError && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <p className="text-red-300 text-sm">{fetchError}</p>
            </div>
          )}

          {isMatching && (
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
              <p className="text-white/50 text-sm">
                Generating career intelligence report…
              </p>
            </div>
          )}

          {matchError && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <p className="text-red-300 text-sm">{matchError}</p>
            </div>
          )}

          {matchResult && (
            <div className="space-y-6">
              <SkillGapCard matchResult={matchResult} />
              <PlacementReadinessCard matchResult={matchResult} />
              <LearningPathCard matchResult={matchResult} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CareerIntelligencePage;