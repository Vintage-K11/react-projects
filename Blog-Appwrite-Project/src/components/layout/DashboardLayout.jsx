import React, { useState } from "react";
import Sidebar from "./layoutcomponents/Sidebar";
import HeaderLite from "./layoutcomponents/HeaderLite";
import FooterLite from "./layoutcomponents/FooterLite";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 min-h-screen">
        <HeaderLite variant="dashboard" toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <FooterLite />
      </div>
    </div>
  );
};

export default DashboardLayout;
