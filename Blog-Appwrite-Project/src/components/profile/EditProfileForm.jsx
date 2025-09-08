// src/components/profile/EditProfileForm.jsx
import { useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import  Textarea from "../common/Textarea";
import { Card } from "../common/Card";

const EditProfileForm = ({ user, onSave }) => {
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <Card className="max-w-xl mx-auto shadow-sm">
      <Card.Header>
        <Card.Title>Edit Profile</Card.Title>
      </Card.Header>
      <Card.Content>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Textarea
            label="Bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
          />
          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
          <Input
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </Card.Content>
    </Card>
  );
};

export default EditProfileForm;
