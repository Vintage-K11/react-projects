// src/components/layout/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Header from "./layoutcomponents/Header";
import Footer from "./layoutcomponents/Footer";
import Container from "./layoutcomponents/Container";

// 3-Column Layout (for Blog/CRUD pages)
const ThreeColumnLayout = () => (
  <div className="flex min-h-screen">
    {/* Left Sidebar */}
    <div className="w-1/4 bg-gray-200 sticky top-0 h-screen p-4">
      <p>Left Sidebar</p>
    </div>

    {/* Main Content (Scrollable) */}
    <main className="flex-1 overflow-auto p-4">
      <Outlet />
    </main>

    {/* Right Sidebar */}
    <div className="w-1/4 bg-gray-200 sticky top-0 h-screen p-4">
      <p>Right Sidebar</p>
    </div>
  </div>
);

// Full-Width Layout (for pages like Home, About, Contact, etc.)
const FullWidthLayout = () => (
  <div className="w-full min-h-screen">
    <main>
      <Outlet />
    </main>
  </div>
);

const MainLayout = () => {
  const location = useLocation();
  const isBlogPage =
    location.pathname.includes("/post") ||
    location.pathname.includes("/create") ||
    location.pathname.includes("/edit");

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />

      {/* Conditionally render Full Width or 3-Column Layout */}
      {isBlogPage ? <ThreeColumnLayout /> : <FullWidthLayout />}

      <Footer />
    </div>
  );
};

export default MainLayout;
