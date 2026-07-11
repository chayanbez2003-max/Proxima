import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import AppRoutes from "./routes/AppRoutes.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(import.meta.env);
console.log("Publishable Key:", import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in client/.env");
}

const App = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClerkProvider>
  );
};

export default App;
