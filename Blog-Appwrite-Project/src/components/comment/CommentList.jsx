import React from "react";
import CommentCard from "./CommentCard";

const CommentList = ({ comments = [] }) => {
  if (comments.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No comments yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
