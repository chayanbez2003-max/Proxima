import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ROUTES } from "../../../constants/routes.js";

/**
 * CtaSection
 *
 * Final call-to-action at the bottom of /why-proxima.
 * "Start Analysis"  → upload flow (auth-aware: /upload for signed-in, /sign-up for signed-out)
 * "Learn More"      → back to landing page
 */
const CtaSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto text-center space-y-8"
      >
        {/* Decorative ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative inline-flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-2xl scale-150" />
          <div className="relative w-16 h-16 rounded-full border border-indigo-500/20 bg-indigo-500/8 flex items-center justify-center text-2xl">
            🚀
          </div>
        </motion.div>

        {/* Heading */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Ready to accelerate your career?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="text-white/45 text-base leading-relaxed"
          >
            Upload your resume and get a complete career intelligence report in
            under a minute — no prompt engineering, no manual research.
          </motion.p>
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary — auth-aware */}
          <SignedIn>
            <Link
              to={ROUTES.UPLOAD}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
            >
              Start Analysis
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link
              to={ROUTES.SIGN_UP}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
            >
              Start Analysis Free
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </SignedOut>

          {/* Secondary */}
          <Link
            to={ROUTES.HOME}
            className="px-6 py-3.5 rounded-xl font-medium text-sm text-white/50 hover:text-white border border-white/8 hover:border-white/15 hover:bg-white/[0.03] transition-all"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
