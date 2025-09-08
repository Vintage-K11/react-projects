// src/components/layout/DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "./layoutcomponents/Sidebar";
import Header from "./layoutcomponents/Header";
import FooterLite from "./layoutcomponents/FooterLite";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>

        {/* Footer Lite */}
        <FooterLite />
      </div>
    </div>
  );
};

export default DashboardLayout;
