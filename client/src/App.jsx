import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";

/**
 * App
 * Root component — wraps the application in BrowserRouter
 * and renders the route tree.
 *
 * Future providers (AuthContext, ThemeContext, etc.) are added here,
 * wrapping <AppRoutes />.
 */
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
