// src/components/common/Loader.jsx
import React from "react";
import { cn } from "@/lib/utils";

// A flexible loader that can be used anywhere
function Loader({ size = "md", className }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div
      className={cn(
        "border-primary border-t-transparent animate-spin rounded-full",
        sizes[size],
        className
      )}
    />
  );
}

export default Loader;
