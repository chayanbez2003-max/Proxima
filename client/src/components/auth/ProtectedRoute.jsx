import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";

/**
 * ProtectedRoute
 *
 * Wraps any route element that requires authentication.
 *
 * Behaviour:
 *  - isLoaded=false → render nothing while Clerk initialises (prevents flash)
 *  - isSignedIn=false → redirect to Clerk sign-in, preserving the original URL
 *    so the user is returned to their intended destination after login.
 *  - isSignedIn=true → render children normally
 *
 * Usage in AppRoutes:
 *   <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  // While Clerk SDK is loading, show nothing (prevents redirect flash)
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
      </div>
    );
  }

  // Not authenticated — redirect to sign-in, save intended path
  if (!isSignedIn) {
    return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
