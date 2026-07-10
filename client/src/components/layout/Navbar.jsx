import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { APP_CONFIG } from "../../constants/appConfig.js";
import { ROUTES } from "../../constants/routes.js";

/**
 * Navbar
 * Minimal top navigation for Milestone 1.
 * Will expand with auth controls in a later milestone.
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
        <nav className="flex items-center gap-1">
          {pathname !== ROUTES.UPLOAD && (
            <Link
              to={ROUTES.UPLOAD}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              Upload Resume
            </Link>
          )}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white/40 hover:text-white/70 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
