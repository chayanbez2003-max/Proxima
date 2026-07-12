import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  {
    icon: "🎯",
    point: "Purpose",
    generalAI: "General-purpose AI for many tasks",
    proxima: "Career-focused platform built for resume improvement",
  },
  {
    icon: "📄",
    point: "Resume Analysis",
    generalAI: "Gives suggestions based on prompts",
    proxima: "Analyzes uploaded resumes through a structured workflow",
  },
  {
    icon: "🧭",
    point: "Role Matching",
    generalAI: "User must manually explain the target role",
    proxima: "User selects a role and gets role-based skill gap analysis",
  },
  {
    icon: "📊",
    point: "Career Guidance",
    generalAI: "Provides general advice in text form",
    proxima: "Gives readiness score, learning roadmap, and next skills",
  },
  {
    icon: "☁️",
    point: "Report Access",
    generalAI: "Mostly works like a one-time response",
    proxima: "Saves career reports using MongoDB and AWS S3",
  },
  {
    icon: "✅",
    point: "Progress Tracking",
    generalAI: "No built-in skill completion tracking",
    proxima: "Tracks completed skills and updates readiness score",
  },
];

const UNIQUE_FEATURES = [
  {
    icon: "🎯",
    title: "Role-Based Intelligence",
    desc: "Analyzes the resume based on the selected target role instead of giving generic feedback.",
  },
  {
    icon: "☁️",
    title: "Saved Career Reports",
    desc: "Stores report metadata in MongoDB and full career reports in AWS S3 for future access.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    desc: "Lets users mark skills as completed and updates their estimated readiness score.",
  },
];

// ── Animation helpers ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

const ComparisonTable = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center space-y-5"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300"
          >
            Why Proxima AI is Different
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Not just AI advice —
            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              a career improvement system
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-white/45 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            General AI tools can answer career questions. Proxima AI is
            purpose-built to guide students from resume analysis to role-based
            skill improvement, saved reports, and placement readiness tracking.
          </motion.p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_45px_rgba(99,102,241,0.10)]"
        >
          <table className="w-full text-sm min-w-[850px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.025]">
                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                  Comparison Point
                </th>

                <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                  General AI Tools
                </th>

                <th className="px-6 py-5 text-left bg-gradient-to-b from-indigo-500/15 to-violet-500/10 border-l border-indigo-500/25">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                        Proxima AI
                      </p>
                      <p className="text-xs text-white/35 mt-1">
                        Built for career intelligence
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-indigo-500/15 border border-indigo-400/25 text-indigo-200">
                      Best Fit
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {COMPARISON_ROWS.map((row, index) => (
                <tr
                  key={row.point}
                  className={`border-b border-white/[0.05] last:border-0 transition-all duration-200 hover:bg-white/[0.025] ${
                    index % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
                  }`}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-base">
                        {row.icon}
                      </span>

                      <span className="text-white font-semibold">
                        {row.point}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-white/45 leading-relaxed">
                    {row.generalAI}
                  </td>

                  <td className="px-6 py-5 bg-gradient-to-r from-indigo-500/[0.07] to-violet-500/[0.04] border-l border-indigo-500/25">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-indigo-300">✦</span>
                      <p className="text-white/85 leading-relaxed font-medium">
                        {row.proxima}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Unique Feature Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {UNIQUE_FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-indigo-500/[0.06] hover:border-indigo-500/25 p-6 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>

              <h3 className="text-white font-semibold mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-white/40 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-cyan-500/10 px-6 py-5">
            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              <span className="font-semibold text-white">
                In simple terms:
              </span>{" "}
              General AI tools give answers.{" "}
              <span className="font-semibold text-indigo-300">
                Proxima AI gives a structured path from resume analysis to
                placement readiness.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;