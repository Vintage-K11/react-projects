// src/components/common/Textarea.jsx
import React from "react";
import { cn } from "../../lib/utils"; // utility for className concatenation

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "w-full min-h-16 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs " +
          "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 " +
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 " +
          "flex field-sizing-content transition-[color,box-shadow] outline-none focus-visible:ring-[3px] " +
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
export default Textarea;
