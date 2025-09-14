// src/components/common/UserAvatar.jsx
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserAvatar = ({ src, alt, name, className = "w-8 h-8" }) => {
  const fallbackLetter = name ? name[0].toUpperCase() : "?";

  return (
    <Avatar className={className} aria-label={name || "User avatar"}>
      {src ? <AvatarImage src={src} alt={alt || name || "User avatar"} /> : null}
      <AvatarFallback>{fallbackLetter}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
