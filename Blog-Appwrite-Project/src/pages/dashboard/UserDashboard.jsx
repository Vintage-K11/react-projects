import React from "react";
import DashboardStatsCard from "@/components/dashboard/DashboardStatsCard";
import ProfilePosts from "@/components/profile/ProfilePosts";
import { FileText, User, MessageCircle, Heart } from "lucide-react";

const UserDashboard = () => {
  // Stats for the user
  const stats = [
    { title: "Posts", value: 12, icon: <FileText size={24} /> },
    { title: "Followers", value: 100, icon: <User size={24} /> },
    { title: "Following", value: 50, icon: <Heart size={24} /> },
    { title: "Comments", value: 5, icon: <MessageCircle size={24} /> },
  ];

  // Mock posts
  const mockPosts = [
    { id: "a1", title: "My first post", slug: "my-first-post", excerpt: "This is my first post", author: "You", date: "2025-09-01", image: "" },
    { id: "a2", title: "React Tips", slug: "react-tips", excerpt: "Some useful React tips", author: "You", date: "2025-09-05", image: "" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <DashboardStatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Recent Posts Table */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Your Recent Posts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Title</th>
                <th className="border-b px-4 py-2">Date</th>
                <th className="border-b px-4 py-2">Excerpt</th>
                <th className="border-b px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2">{post.date}</td>
                  <td className="px-4 py-2">{post.excerpt}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optionally, you can keep ProfilePosts component for a more visual style */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Post Cards View</h2>
        <ProfilePosts posts={mockPosts} />
      </div>
    </div>
  );
};

export default UserDashboard;
