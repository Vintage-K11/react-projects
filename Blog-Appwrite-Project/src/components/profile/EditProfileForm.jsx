// src/components/profile/EditProfileForm.jsx
import { useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Textarea } from "../common/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";

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
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default EditProfileForm;
