// src/components/layout/layoutcomponents/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, FileText, Settings, User } from "lucide-react";

const Sidebar = ({ isOpen = true, toggleSidebar }) => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { name: "All Posts", path: "/all-posts", icon: <FileText size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Settings", path: "/blog-settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside
      className={`bg-gray-900 text-gray-200 min-h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1
          className={`text-xl font-bold text-white truncate ${
            isOpen ? "block" : "hidden"
          }`}
        >
          Blogify
        </h1>
        <button
          className="text-gray-400 hover:text-white md:hidden"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors rounded-md ${
                isActive ? "bg-gray-800 text-white" : "text-gray-300"
              }`
            }
          >
            {item.icon}
            <span className={`${isOpen ? "inline" : "hidden"}`}>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
