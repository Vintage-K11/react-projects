import React from "react";
import { Label as UILabel } from "../ui/label";

// Common Label for the app
export const Label = ({ htmlFor, className, children, ...props }) => {
  return (
    <UILabel htmlFor={htmlFor} className={className} {...props}>
      {children}
    </UILabel>
  );
};
