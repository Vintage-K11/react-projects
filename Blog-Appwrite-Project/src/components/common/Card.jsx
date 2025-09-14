// src/components/common/Card.jsx
import React from "react";
import {
  Card as UICard,
  CardHeader as UICardHeader,
  CardTitle as UICardTitle,
  CardDescription as UICardDescription,
  CardContent as UICardContent,
  CardAction as UICardAction,
  CardFooter as UICardFooter,
} from "../ui/card";

// Main Card wrapper
const Card = ({ children, className = "", ...props }) => {
  return (
    <UICard className={className} {...props}>
      {children}
    </UICard>
  );
};

// Subcomponents for easy import
Card.Header = UICardHeader;
Card.Title = UICardTitle;
Card.Description = UICardDescription;
Card.Content = UICardContent;
Card.Action = UICardAction;
Card.Footer = UICardFooter;

// Display name for React DevTools
Card.displayName = "Card";

export { Card };
export default Card;
