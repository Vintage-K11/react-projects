import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs"; // for theme toggle button

export default function SocialSidebar() {
  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 flex flex-col items-center gap-4 bg-white dark:bg-gray-900 p-3 rounded-r-lg shadow-lg z-50">
      {/* Theme Toggle Button */}
      <button
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        // onClick={} // functionality later
      >
        <BsSun className="w-5 h-5 text-yellow-500 dark:hidden" />
        <BsMoon className="w-5 h-5 text-gray-900 hidden dark:block" />
      </button>

      {/* Social Icons */}
      <a href="#" className="p-2 hover:text-blue-600 transition">
        <FaFacebook className="w-5 h-5" />
      </a>
      <a href="#" className="p-2 hover:text-blue-400 transition">
        <FaTwitter className="w-5 h-5" />
      </a>
      <a href="#" className="p-2 hover:text-blue-700 transition">
        <FaLinkedin className="w-5 h-5" />
      </a>
      <a href="#" className="p-2 hover:text-gray-900 transition">
        <FaGithub className="w-5 h-5" />
      </a>
    </div>
  );
}
