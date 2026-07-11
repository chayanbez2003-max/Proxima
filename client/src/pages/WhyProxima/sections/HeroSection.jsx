import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ROUTES } from "../../../constants/routes.js";

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const item = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/**
 * HeroSection
 *
 * Full-height introductory hero for /why-proxima.
 * CTA navigates authenticated users to /upload, unauthenticated to /sign-up.
 */
const HeroSection = () => (
  <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 text-center">
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto space-y-7"
    >
      {/* Badge */}
      <motion.div
        variants={item}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium uppercase tracking-widest"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        Career Intelligence Platform
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={item}
        className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-white"
      >
        Why{" "}
        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Proxima?
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={item}
        className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed"
      >
        An AI-powered Career Intelligence Platform built specifically for
        students and job seekers — not a general-purpose chatbot.
      </motion.p>

      {/* CTA */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
      >
        <SignedIn>
          <Link
            to={ROUTES.UPLOAD}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
          >
            Try Proxima
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </SignedIn>
        <SignedOut>
          <Link
            to={ROUTES.SIGN_UP}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
          >
            Try Proxima Free
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </SignedOut>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        variants={item}
        className="flex justify-center pt-6"
      >
        <div className="flex flex-col items-center gap-1 text-white/20">
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default HeroSection;
