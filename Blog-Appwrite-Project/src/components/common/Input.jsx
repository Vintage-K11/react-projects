// src/components/common/Input.jsx
import React from "react";
import { Input as UIInput } from "../ui/input";

// Reusable Input component with ref support
const Input = React.forwardRef(
  ({ className = "", type = "text", placeholder = "", ...props }, ref) => {
    return (
      <UIInput
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`w-full ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
