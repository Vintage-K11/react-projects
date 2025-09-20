import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';

// Mock data for demonstration
const mockBookmarks = [
  { id: 'post3', title: 'A Guide to Serverless Functions', author: 'Jane Smith', excerpt: 'Explore the world of serverless architecture and how it can benefit your projects...' },
  { id: 'post4', title: 'Mastering Tailwind CSS', author: 'Alex Johnson', excerpt: 'Learn advanced techniques and best practices for using Tailwind CSS in large-scale applications...' },
];

const ProfileBookmarks = ({ userId }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch bookmarked posts for the userId here.
    const timer = setTimeout(() => {
      setBookmarks(mockBookmarks);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [userId]);

  if (isLoading) {
    return <div className="text-center text-muted-foreground py-8">Loading bookmarks...</div>;
  }

  return (
    <div className="space-y-4">
      {bookmarks.length > 0 ? bookmarks.map(post => (
        <Card key={post.id} className="p-4">
          <Link to={`/post/${post.id}`} className="hover:underline">
            <h3 className="font-bold text-lg text-primary">{post.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">by {post.author}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
        </Card>
      )) : (
        <div className="text-center text-muted-foreground py-8">
          <p>You haven't bookmarked any posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileBookmarks;