import React from "react";
import UserAvatar from "../common/UserAvatar";

const PostMeta = ({ author = "Anonymous", date }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString() : "Unknown date";

  return (
    <div className="flex items-center gap-2">
      <UserAvatar name={author} />
      <div className="text-sm text-muted-foreground">
        <p>{author}</p>
        <p className="text-xs">{formattedDate}</p>
      </div>
    </div>
  );
};

export default PostMeta;
