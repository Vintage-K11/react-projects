// src/components/common/Button.jsx
import React from "react";
import { Button as UIButton } from "../ui/button";

// Reusable Button component
const Button = React.forwardRef(
  ({ children, variant = "primary", size = "default", className = "", ...props }, ref) => {
    return (
      <UIButton
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </UIButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
