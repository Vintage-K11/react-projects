import React from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";

const BlogSettings = () => {
  // TODO: admin-only page; real app should protect this route
  const handleSave = () => {
    // TODO: persist settings
    alert("Settings saved (mock)");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Card>
        <Card.Header>
          <Card.Title>Blog Settings</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Site title</label>
              <input className="w-full border rounded p-2" defaultValue="My Blog" />
            </div>
            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea className="w-full border rounded p-2" defaultValue="A short description" />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default BlogSettings;
