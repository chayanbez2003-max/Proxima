import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const LEGEND = [
  { icon: "✅", label: "Supported" },
  { icon: "⚠️", label: "Possible with prompting" },
  { icon: "⭐", label: "Built specifically for this" },
];

const FEATURES = [
  "Resume Upload",
  "Structured Resume Parsing",
  "Role-Based Skill Matching",
  "Skill Gap Analysis",
  "Career Readiness Score",
  "Learning Roadmap",
  "Career Dashboard",
  "Personalised Career Advice",
];

/**
 * Comparison data.
 *
 * Disclaimer shown at the bottom of the table:
 *   This is a feature/workflow comparison, NOT an AI quality benchmark.
 *   ChatGPT and Claude are extremely capable general-purpose AI assistants.
 *   Proxima is purpose-built for a specific structured career workflow.
 */
const COLUMNS = [
  {
    name: "ChatGPT",
    subtitle: "General-purpose AI",
    color: "text-emerald-400",
    border: "border-emerald-500/15",
    bg: "bg-emerald-500/5",
    values: ["✅", "⚠️", "⚠️", "⚠️", "⚠️", "⚠️", "⚠️", "✅"],
  },
  {
    name: "Claude",
    subtitle: "General-purpose AI",
    color: "text-amber-400",
    border: "border-amber-500/15",
    bg: "bg-amber-500/5",
    values: ["✅", "⚠️", "⚠️", "⚠️", "⚠️", "⚠️", "⚠️", "✅"],
  },
  {
    name: "Proxima AI",
    subtitle: "Career Intelligence Platform",
    color: "text-indigo-400",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/8",
    highlight: true,
    values: ["⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐"],
  },
];

// ── Animation helpers ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * ComparisonTable
 *
 * Feature/workflow matrix comparing ChatGPT, Claude, and Proxima AI.
 * Clearly framed as a workflow comparison, not an AI quality benchmark.
 */
const ComparisonTable = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center space-y-4"
        >
          <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-widest text-indigo-400">
            Workflow Comparison
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white">
            The right tool for the job
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
            ChatGPT and Claude are excellent general-purpose assistants.
            Proxima is a structured career workflow — built from the ground up
            for resume analysis, skill matching, and career readiness.
          </motion.p>
        </motion.div>

        {/* Legend */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-6"
        >
          {LEGEND.map(({ icon, label }) => (
            <motion.span key={label} variants={fadeUp} className="flex items-center gap-2 text-sm text-white/50">
              <span className="text-base leading-none">{icon}</span>
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="overflow-x-auto rounded-2xl border border-white/5 backdrop-blur-sm bg-white/[0.02]"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-5 text-left text-xs font-medium uppercase tracking-widest text-white/30 w-48">
                  Feature
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col.name}
                    className={`px-6 py-5 text-center ${col.highlight ? `rounded-t-xl border border-b-0 ${col.border} ${col.bg}` : ""}`}
                  >
                    <span className={`block text-sm font-bold ${col.color}`}>{col.name}</span>
                    <span className="block text-xs text-white/30 font-normal mt-0.5">{col.subtitle}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feature, fi) => (
                <tr
                  key={feature}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 text-white/60 font-medium">{feature}</td>
                  {COLUMNS.map((col) => (
                    <td
                      key={col.name}
                      className={`px-6 py-4 text-center text-lg ${col.highlight ? `border-x ${col.border} ${col.bg} ${fi === FEATURES.length - 1 ? `border-b rounded-b-xl` : ""}` : ""}`}
                    >
                      {col.values[fi]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center text-xs text-white/25 max-w-lg mx-auto"
        >
          ⚠️ This is a feature/workflow comparison, not an AI quality benchmark.
          ChatGPT and Claude are powerful general-purpose assistants.
          Proxima is purpose-built for a structured career intelligence workflow.
        </motion.p>
      </div>
    </section>
  );
};

export default ComparisonTable;
