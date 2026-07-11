import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { APP_CONFIG } from "../../constants/appConfig.js";
import { ROUTES } from "../../constants/routes.js";

/**
 * Navbar
 *
 * Top navigation bar — auth-aware.
 *
 * Signed OUT: shows "Sign In" and "Get Started" buttons
 * Signed IN:  shows Dashboard link, Upload Resume link, and Clerk UserButton
 *             (UserButton includes avatar, user profile, and sign-out)
 */
const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-16"
    >
      {/* Glass-morphism bar */}
      <div className="mx-auto h-full max-w-7xl px-6 flex items-center justify-between backdrop-blur-md bg-[#0a0a0f]/70 border-b border-white/5">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight text-white">
            {APP_CONFIG.APP_NAME}
          </span>
          <span className="hidden sm:inline text-xs text-indigo-400 font-medium uppercase tracking-widest mt-0.5">
            AI
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-2">

          {/* ── Always visible ─────────────────────────────── */}
          {pathname !== ROUTES.WHY_PROXIMA && (
            <Link
              to={ROUTES.WHY_PROXIMA}
              className="px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              Why Proxima?
            </Link>
          )}

          {/* ── Signed In ─────────────────────────────────── */}
          <SignedIn>
            {pathname !== ROUTES.DASHBOARD && (
              <Link
                to={ROUTES.DASHBOARD}
                className="px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                Dashboard
              </Link>
            )}
            {pathname !== ROUTES.UPLOAD && (
              <Link
                to={ROUTES.UPLOAD}
                className="px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                Upload Resume
              </Link>
            )}
            {/* Clerk UserButton: avatar + dropdown with profile & sign-out */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-2 ring-indigo-500/30 hover:ring-indigo-500/60 transition-all",
                },
              }}
            />
          </SignedIn>

          {/* ── Signed Out ────────────────────────────────── */}
          <SignedOut>
            <Link
              to={ROUTES.SIGN_IN}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to={ROUTES.SIGN_UP}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/15"
            >
              Get Started
            </Link>
          </SignedOut>

        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
