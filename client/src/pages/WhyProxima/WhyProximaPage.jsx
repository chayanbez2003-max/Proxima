import MainLayout from "../../components/layout/MainLayout.jsx";
import HeroSection         from "./sections/HeroSection.jsx";
import ComparisonTable     from "./sections/ComparisonTable.jsx";
import WorkflowComparison  from "./sections/WorkflowComparison.jsx";
import FeatureHighlights   from "./sections/FeatureHighlights.jsx";
import CtaSection          from "./sections/CtaSection.jsx";

/**
 * WhyProximaPage
 *
 * Public marketing page explaining the difference between Proxima and
 * general-purpose AI assistants.  Accessible at /why-proxima.
 *
 * Structure:
 *  1. HeroSection        — headline + CTA
 *  2. ComparisonTable    — feature matrix vs ChatGPT / Claude
 *  3. WorkflowComparison — side-by-side workflow timeline
 *  4. FeatureHighlights  — feature card grid
 *  5. CtaSection         — final call to action
 */
const WhyProximaPage = () => {
  return (
    <MainLayout>
      {/* Shared ambient glow — positioned behind all sections */}
      <div className="relative">
        <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
          <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/8 blur-3xl" />
          <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full bg-violet-600/6 blur-3xl" />
          <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full bg-cyan-600/6 blur-3xl" />
        </div>

        <HeroSection />
        <ComparisonTable />
        <WorkflowComparison />
        <FeatureHighlights />
        <CtaSection />
      </div>
    </MainLayout>
  );
};

export default WhyProximaPage;
