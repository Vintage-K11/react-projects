// src/components/layout/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Header from "./layoutcomponents/Header";
import Footer from "./layoutcomponents/Footer";

const ThreeColumnLayout = () => (
  <div className="flex min-h-screen">
    <div className="w-1/4 bg-gray-200 sticky top-0 h-screen p-4">Left Sidebar</div>
    <main className="flex-1 overflow-auto p-4">
      <Outlet />
    </main>
    <div className="w-1/4 bg-gray-200 sticky top-0 h-screen p-4">Right Sidebar</div>
  </div>
);

const FullWidthLayout = () => (
  <div className="w-full min-h-screen">
    <main>
      <Outlet />
    </main>
  </div>
);

const MainLayout = () => {
  const location = useLocation();

  // Force re-render of Header whenever route changes
  const isBlogPage =
    location.pathname.includes("/post") ||
    location.pathname.includes("/create") ||
    location.pathname.includes("/edit");

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header key={location.key} /> {/* ✅ Forces Header to re-render on route/user changes */}
      {isBlogPage ? <ThreeColumnLayout /> : <FullWidthLayout />}
      <Footer />
    </div>
  );
};

export default MainLayout;
