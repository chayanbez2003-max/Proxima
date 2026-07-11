import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const TRADITIONAL_STEPS = [
  { label: "Upload Resume",                icon: "📄" },
  { label: "Write Prompts",                icon: "💬" },
  { label: "Read Long Responses",          icon: "📖" },
  { label: "Manually Identify Skill Gaps", icon: "🔍" },
  { label: "Search Learning Resources",    icon: "🌐" },
];

const PROXIMA_STEPS = [
  { label: "Upload Resume",            icon: "📄", highlight: false },
  { label: "Automatic Resume Parsing", icon: "⚡", highlight: true  },
  { label: "Select Target Career",     icon: "🎯", highlight: false },
  { label: "Skill Gap Analysis",       icon: "🧠", highlight: true  },
  { label: "Career Readiness Score",   icon: "📊", highlight: true  },
  { label: "Learning Roadmap",         icon: "🗺️", highlight: true  },
  { label: "Gemini Career Advisor",    icon: "✨", highlight: true  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const StepCard = ({ step, index, isProxima }) => (
  <motion.div
    initial={{ opacity: 0, x: isProxima ? 24 : -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, delay: index * 0.09, ease: "easeOut" }}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
      isProxima && step.highlight
        ? "border-indigo-500/30 bg-indigo-500/8 text-white"
        : "border-white/5 bg-white/[0.025] text-white/60"
    }`}
  >
    <span className="text-xl w-7 text-center leading-none shrink-0">{step.icon}</span>
    <span className="text-sm font-medium">{step.label}</span>
  </motion.div>
);

const Arrow = ({ isProxima }) => (
  <div className="flex justify-start pl-7">
    <svg
      className={`w-4 h-4 ${isProxima ? "text-indigo-500/40" : "text-white/10"}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

const WorkflowColumn = ({ title, subtitle, steps, isProxima }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`flex-1 min-w-0 rounded-2xl border p-6 space-y-1 ${
      isProxima
        ? "border-indigo-500/20 bg-indigo-500/[0.04]"
        : "border-white/5 bg-white/[0.02]"
    }`}
  >
    {/* Column header */}
    <div className="mb-5">
      <h3 className={`text-lg font-bold ${isProxima ? "text-indigo-300" : "text-white/60"}`}>
        {title}
      </h3>
      <p className="text-xs text-white/30 mt-0.5">{subtitle}</p>
    </div>

    {/* Steps */}
    <div className="space-y-1">
      {steps.map((step, i) => (
        <div key={step.label}>
          <StepCard step={step} index={i} isProxima={isProxima} />
          {i < steps.length - 1 && <Arrow isProxima={isProxima} />}
        </div>
      ))}
    </div>
  </motion.div>
);

// ── Main component ────────────────────────────────────────────────────────────

/**
 * WorkflowComparison
 *
 * Side-by-side visual timeline comparing the traditional AI assistant
 * workflow with the Proxima structured career workflow.
 */
const WorkflowComparison = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Section header */}
        <div className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium uppercase tracking-widest text-violet-400"
          >
            Workflow Comparison
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            The structured path vs. the manual one
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed"
          >
            General-purpose AI gives you answers. Proxima gives you a
            structured career intelligence workflow — no prompt engineering
            required.
          </motion.p>
        </div>

        {/* Two columns */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <WorkflowColumn
            title="Traditional AI Workflow"
            subtitle="Manual, unstructured, time-consuming"
            steps={TRADITIONAL_STEPS}
            isProxima={false}
          />

          {/* VS divider */}
          <div className="hidden md:flex flex-col items-center justify-center self-stretch">
            <div className="h-full w-px bg-white/5" />
            <span className="my-4 text-xs font-bold text-white/20 uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02]">
              vs
            </span>
            <div className="h-full w-px bg-white/5" />
          </div>

          <WorkflowColumn
            title="Proxima Workflow"
            subtitle="Structured, automated, actionable"
            steps={PROXIMA_STEPS}
            isProxima={true}
          />
        </div>
      </div>
    </section>
  );
};

export default WorkflowComparison;
