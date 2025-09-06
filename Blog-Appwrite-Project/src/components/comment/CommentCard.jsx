import React from "react";
import UserAvatar from "../common/UserAvatar";

const CommentCard = ({ author, text, date }) => {
  return (
    <div className="flex gap-3 p-3 border rounded-md">
      <UserAvatar name={author} />
      <div className="flex-1">
        <p className="font-medium">{author}</p>
        <p className="text-sm text-muted-foreground">{text}</p>
        <p className="text-xs text-muted-foreground mt-1">{new Date(date).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CommentCard;
