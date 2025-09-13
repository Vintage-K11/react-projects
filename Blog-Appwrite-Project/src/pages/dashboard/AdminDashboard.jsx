import React from "react";
import DashboardStatsCard from "@/components/dashboard/DashboardStatsCard";
import { Card } from "@/components/common/Card";
import { User, FileText, Shield, Settings } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: 1200, icon: <User size={24} /> },
    { title: "Total Posts", value: 540, icon: <FileText size={24} /> },
    { title: "Admins", value: 5, icon: <Shield size={24} /> },
    { title: "Settings Changed", value: 10, icon: <Settings size={24} /> },
  ];

  // Mock data for tables
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "user" },
  ];

  const posts = [
    { id: 1, title: "First Post", author: "John Doe", status: "Published" },
    { id: 2, title: "React Tips", author: "Jane Smith", status: "Draft" },
    { id: 3, title: "Admin Guide", author: "Mike Johnson", status: "Published" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Grid */}
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

      {/* Users Management */}
      <Card className="mb-6">
        <Card.Header>
          <Card.Title>Users</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2">Name</th>
                  <th className="border-b px-4 py-2">Email</th>
                  <th className="border-b px-4 py-2">Role</th>
                  <th className="border-b px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-500 hover:underline mr-2">Edit</button>
                      <button className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>

      {/* Posts Management */}
      <Card>
        <Card.Header>
          <Card.Title>Posts</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2">Title</th>
                  <th className="border-b px-4 py-2">Author</th>
                  <th className="border-b px-4 py-2">Status</th>
                  <th className="border-b px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{post.title}</td>
                    <td className="px-4 py-2">{post.author}</td>
                    <td className="px-4 py-2">{post.status}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-500 hover:underline mr-2">Edit</button>
                      <button className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default AdminDashboard;
