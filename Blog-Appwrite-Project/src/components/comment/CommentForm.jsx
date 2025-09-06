import React, { useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

const CommentForm = ({ postId, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit({ postId, text: comment }); // backend logic will be added later
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <Button type="submit" className="self-end">
        Post Comment
      </Button>
    </form>
  );
};

export default CommentForm;
