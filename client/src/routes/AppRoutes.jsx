import { Routes, Route } from "react-router-dom";
import LandingPage   from "../pages/Landing/LandingPage.jsx";
import UploadPage    from "../pages/Upload/UploadPage.jsx";
import AnalysisPage  from "../pages/Analysis/AnalysisPage.jsx";
import NotFoundPage  from "../pages/NotFound/NotFoundPage.jsx";
import { ROUTES }    from "../constants/routes.js";

/**
 * AppRoutes
 * Central route registry.
 *
 * /              → LandingPage
 * /upload        → UploadPage  (PDF upload → redirect to /analysis/:id)
 * /analysis/:id  → AnalysisPage (resume summary + career intelligence)
 * *              → NotFoundPage
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME}     element={<LandingPage />}  />
      <Route path={ROUTES.UPLOAD}   element={<UploadPage />}   />
      <Route path={ROUTES.ANALYSIS} element={<AnalysisPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
