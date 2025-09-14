// src/components/blog/PostMeta.jsx
import React from "react";
import UserAvatar from "../common/UserAvatar";

const PostMeta = ({ author = "Anonymous", date }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <div className="flex items-center gap-2">
      <UserAvatar name={author} />
      <div className="text-sm text-muted-foreground">
        <p className="font-medium">{author}</p>
        <p className="text-xs">{formattedDate}</p>
      </div>
    </div>
  );
};

export default PostMeta;
