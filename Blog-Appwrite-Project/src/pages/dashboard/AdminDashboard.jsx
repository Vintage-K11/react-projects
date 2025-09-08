import React from "react";
import { Card } from "@/components/common/Card";

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <Card.Header><Card.Title>Users</Card.Title></Card.Header>
          <Card.Content>Manage users (mock)</Card.Content>
        </Card>
        <Card>
          <Card.Header><Card.Title>Posts</Card.Title></Card.Header>
          <Card.Content>Manage posts (mock)</Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
