import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "🧠",
    title: "Career Intelligence",
    description:
      "Role-specific skill analysis powered by a curated industry skill database — not a generic prompt.",
    color: "from-indigo-500/20 to-indigo-500/5",
    border: "border-indigo-500/15",
    glow: "group-hover:shadow-indigo-500/10",
  },
  {
    icon: "📄",
    title: "Resume Analysis",
    description:
      "Structured PDF parsing extracts name, contact info, education, experience, and skills automatically.",
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/15",
    glow: "group-hover:shadow-violet-500/10",
  },
  {
    icon: "🔍",
    title: "Skill Gap Detection",
    description:
      "Compares your extracted skills against a target role's requirements and surfaces exactly what is missing.",
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/15",
    glow: "group-hover:shadow-cyan-500/10",
  },
  {
    icon: "📊",
    title: "Career Readiness",
    description:
      "A quantitative readiness score that tracks your fit for a target role over time.",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/15",
    glow: "group-hover:shadow-emerald-500/10",
  },
  {
    icon: "🗺️",
    title: "Learning Roadmap",
    description:
      "Actionable, role-specific resource suggestions for every missing skill — curated, not hallucinated.",
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/15",
    glow: "group-hover:shadow-amber-500/10",
  },
  {
    icon: "✨",
    title: "Gemini Career Advisor",
    description:
      "Contextual AI career advice powered by Google Gemini — aware of your resume, role, and skill gaps.",
    color: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/15",
    glow: "group-hover:shadow-pink-500/10",
  },
  {
    icon: "📈",
    title: "Interactive Dashboard",
    description:
      "A persistent history of all your analyses so you can track your progress across sessions.",
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/15",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    icon: "⚙️",
    title: "ATS Optimisation",
    description:
      "Coming soon — automated keyword optimisation to help your resume pass Applicant Tracking Systems.",
    color: "from-slate-500/20 to-slate-500/5",
    border: "border-slate-500/15",
    glow: "group-hover:shadow-slate-500/10",
    comingSoon: true,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
    className={`group relative rounded-2xl border ${feature.border} bg-gradient-to-br ${feature.color} p-6 space-y-3 hover:shadow-xl ${feature.glow} transition-all duration-300 cursor-default`}
  >
    {feature.comingSoon && (
      <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-widest text-white/30 border border-white/10 rounded-full px-2 py-0.5">
        Soon
      </span>
    )}
    <div className="text-3xl leading-none">{feature.icon}</div>
    <h3 className="text-base font-semibold text-white">{feature.title}</h3>
    <p className="text-sm text-white/45 leading-relaxed">{feature.description}</p>
  </motion.div>
);

/**
 * FeatureHighlights
 *
 * 4×2 responsive grid of feature cards, each with a colour-coded
 * glassmorphism treatment and InView animation.
 */
const FeatureHighlights = () => {
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
            className="text-xs font-medium uppercase tracking-widest text-cyan-400"
          >
            Platform Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Everything you need, nothing you don't
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed"
          >
            Every feature in Proxima exists to move you closer to landing your
            target role — not to answer arbitrary questions.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
