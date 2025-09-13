// src/components/layout/layoutcomponents/Sidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  User,
  Settings,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logoutUser } from "@/store/authSlice";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get current user from Redux
  const user = useSelector(selectCurrentUser);
  const userRole = user?.role || "user";

  // Navigation items
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/posts", label: "My Posts", icon: FileText },
    { to: `/profile/${user?.id}`, label: "Profile", icon: User },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const adminItems = [
    { to: "/admin/users", label: "Manage Users", icon: Shield },
    { to: "/admin/settings", label: "Admin Settings", icon: Settings },
  ];

  // Handle Logout
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Render individual link
  const renderLink = ({ to, label, icon: Icon }, index) => {
    const active = location.pathname === to;
    return (
      <Link
        key={to}
        to={to}
        className={`flex items-center gap-3 p-2 rounded-md transition-colors relative ${
          active
            ? "bg-gray-200 font-medium text-gray-900"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
        title={!isOpen ? label : undefined} // Tooltip when collapsed
      >
        <Icon size={20} />
        <AnimatePresence>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    );
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r shadow-md flex flex-col transition-all duration-300`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2 overflow-hidden">
          <Logo small={!isOpen} />
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                className="text-lg font-bold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                MyApp
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        <button className="p-1 rounded hover:bg-gray-100" onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item, i) => renderLink(item, i))}

        {/* Admin Section */}
        {userRole === "admin" && (
          <>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="mt-4 mb-2 text-xs uppercase text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Admin
                </motion.div>
              )}
            </AnimatePresence>
            {adminItems.map((item, i) => renderLink(item, i))}
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors"
          title={!isOpen ? "Logout" : undefined}
        >
          <LogOut size={20} />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
