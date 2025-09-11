// src/components/common/Skeleton.jsx
import { cn } from "@/lib/utils";

function Skeleton({ className, type = "rectangular", ...props }) {
  // Default skeleton type is rectangular; it can be changed to circular, etc.
  const shapeClass = type === "circle" ? "rounded-full" : "rounded-md";

  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-gray-200 animate-pulse transition-all ease-in-out", 
        shapeClass, // Apply rounded class for circle or rectangle
        className // Custom class passed by the parent component
      )}
      {...props}
    />
  );
}

export { Skeleton };
