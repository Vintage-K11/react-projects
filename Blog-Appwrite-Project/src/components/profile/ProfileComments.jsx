import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { formatDistanceToNow } from 'date-fns';

// Mock data for demonstration
const mockComments = [
  { id: '1', content: 'This is a really insightful article, thanks for sharing!', postTitle: 'The Future of Web Development', postId: 'post1', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: '2', content: 'I completely agree with your point on state management.', postTitle: 'Deep Dive into React Hooks', postId: 'post2', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: '3', content: 'Could you elaborate on the performance implications?', postTitle: 'The Future of Web Development', postId: 'post1', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) },
];

const ProfileComments = ({ userId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch comments for the userId here.
    // For now, we'll simulate a network delay.
    const timer = setTimeout(() => {
      setComments(mockComments);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [userId]);

  if (isLoading) {
    return <div className="text-center text-muted-foreground py-8">Loading comments...</div>;
  }

  return (
    <div className="space-y-4">
      {comments.length > 0 ? comments.map(comment => (
        <Card key={comment.id} className="p-4">
          <p className="text-gray-800 dark:text-gray-200">"{comment.content}"</p>
          <div className="text-sm text-muted-foreground mt-2">
            <span>commented on </span>
            <Link to={`/post/${comment.postId}`} className="text-primary hover:underline font-medium">
              {comment.postTitle}
            </Link>
            <span> &middot; {formatDistanceToNow(comment.createdAt, { addSuffix: true })}</span>
          </div>
        </Card>
      )) : (
        <div className="text-center text-muted-foreground py-8">
          <p>This user hasn't made any comments yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileComments;