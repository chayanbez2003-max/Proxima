import CareerIntelligencePage from "../pages/CareerIntelligence/CareerIntelligencePage.jsx";
import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import LandingPage   from "../pages/Landing/LandingPage.jsx";
import UploadPage    from "../pages/Upload/UploadPage.jsx";
import AnalysisPage  from "../pages/Analysis/AnalysisPage.jsx";
import DashboardPage from "../pages/Dashboard/DashboardPage.jsx";
import NotFoundPage  from "../pages/NotFound/NotFoundPage.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import { ROUTES }    from "../constants/routes.js";


/**
 * AppRoutes
 * Central route registry.
 *
 * Public routes (no auth required):
 *  /              → LandingPage
 *  /sign-in       → Clerk SignIn (prebuilt)
 *  /sign-up       → Clerk SignUp (prebuilt)
 *
 * Protected routes (redirect to sign-in if unauthenticated):
 *  /dashboard     → DashboardPage (user's analyses history)
 *  /upload        → UploadPage    (PDF upload → redirect to /analysis/:id)
 *  /analysis/:id  → AnalysisPage  (resume summary + career intelligence)
 *
 *  *              → NotFoundPage
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public ──────────────────────────────────────────── */}
      <Route path={ROUTES.HOME}    element={<LandingPage />} />

      {/* Clerk prebuilt auth pages — styled with Clerk's appearance API */}
      <Route
        path={ROUTES.SIGN_IN + "/*"}
        element={
          <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
            <SignIn routing="path" path={ROUTES.SIGN_IN} afterSignInUrl={ROUTES.DASHBOARD} />
          </div>
        }
      />
      <Route
        path={ROUTES.SIGN_UP + "/*"}
        element={
          <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
            <SignUp routing="path" path={ROUTES.SIGN_UP} afterSignUpUrl={ROUTES.DASHBOARD} />
          </div>
        }
      />

      {/* ── Protected ───────────────────────────────────────── */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.UPLOAD}
        element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ANALYSIS}
        element={
          <ProtectedRoute>
            <AnalysisPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.CAREER_INTELLIGENCE}
        element={
          <ProtectedRoute>
            <CareerIntelligencePage />
          </ProtectedRoute>
        }
      />

      {/* ── 404 ─────────────────────────────────────────────── */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
