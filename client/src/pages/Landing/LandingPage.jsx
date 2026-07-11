import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import MainLayout from "../../components/layout/MainLayout.jsx";
import { ROUTES } from "../../constants/routes.js";
import { APP_CONFIG } from "../../constants/appConfig.js";

// ── Animation variants ────────────────────────────────────
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * LandingPage
 *
 * Hero section introducing Proxima.
 * Single CTA — navigate to the Upload page.
 */
const LandingPage = () => {
  return (
    <MainLayout>
      {/* Ambient glow background */}
      <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-violet-600/8 blur-3xl" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-cyan-600/8 blur-3xl" />
        </div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl text-center space-y-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            {APP_CONFIG.APP_TAGLINE}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-white"
          >
            Understand Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Career Gaps
            </span>
            <br />
            Before Your Interview Does.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Upload your resume, select your target role, and Proxima pinpoints
            exactly which skills you need — and where to learn them.
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Signed IN → go straight to upload */}
            <SignedIn>
              <Link
                to={ROUTES.UPLOAD}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
              >
                Analyze My Resume
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to={ROUTES.DASHBOARD}
                className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
              >
                View my dashboard
              </Link>
            </SignedIn>

            {/* Signed OUT → create account */}
            <SignedOut>
              <Link
                to={ROUTES.SIGN_UP}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
              >
                Get Started Free
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to={ROUTES.SIGN_IN}
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Already have an account? <span className="underline underline-offset-2">Sign in</span>
              </Link>
            </SignedOut>
          </motion.div>

          {/* Feature pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 pt-4">
            {["Resume Parsing", "Skill Gap Detection", "Career Score", "AI Recommendations"].map(
              (f) => (
                <span
                  key={f}
                  className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/40 border border-white/5"
                >
                  {f}
                </span>
              )
            )}
          </motion.div>

          {/* Why Proxima? link */}
          <motion.div variants={itemVariants} className="flex justify-center pt-1">
            <Link
              to={ROUTES.WHY_PROXIMA}
              className="text-sm text-white/35 hover:text-indigo-400 transition-colors underline underline-offset-4 decoration-white/15 hover:decoration-indigo-400/50"
            >
              Why Proxima instead of ChatGPT? →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default LandingPage;
