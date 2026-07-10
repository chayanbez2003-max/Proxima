import Navbar from "./Navbar.jsx";

/**
 * MainLayout
 * Shell wrapper used by every page.
 * Provides: Navbar + full-height background + slot for page content.
 */
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white antialiased">
      <Navbar />
      {/* Offset for fixed navbar */}
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default MainLayout;
