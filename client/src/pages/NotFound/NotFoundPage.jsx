import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../../components/layout/MainLayout.jsx";
import { ROUTES } from "../../constants/routes.js";

/**
 * NotFoundPage
 * Rendered for any unmatched route.
 */
const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-8xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            404
          </p>
          <h1 className="text-2xl font-semibold text-white">Page Not Found</h1>
          <p className="text-white/40">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
