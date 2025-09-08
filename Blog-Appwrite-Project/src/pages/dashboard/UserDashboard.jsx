import React from "react";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfilePosts from "@/components/profile/ProfilePosts";

const UserDashboard = () => {
  const mockPosts = [
    { id: "a1", title: "My post", slug: "mypost", excerpt: "excerpt", author: "You", date: "2025-09-01", image: "" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>
      <ProfileStats stats={{ posts: 1, followers: 10, following: 2, comments: 3 }} />
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
        <ProfilePosts posts={mockPosts} />
      </div>
    </div>
  );
};

export default UserDashboard;
