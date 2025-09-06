// src/components/common/Logo.jsx
import React from "react";
import { Link } from "react-router-dom";

function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 font-bold text-xl text-primary ${className}`}
    >
      {/* Placeholder icon (can be replaced with SVG or image) */}
      <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
        B
      </span>
      <span>Blogify</span>
    </Link>
  );
}

export default Logo;
