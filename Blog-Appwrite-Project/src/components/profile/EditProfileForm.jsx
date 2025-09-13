// src/components/profile/EditProfileForm.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Textarea } from "../common/Textarea";
import { Card } from "../common/Card";
import { updateProfile, selectProfileUpdateStatus } from "@/store/profileSlice";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&f=y";

const EditProfileForm = ({ user, onSaveSuccess }) => {
  const dispatch = useDispatch();
  const updateStatus = useSelector(selectProfileUpdateStatus);
  const isSaving = updateStatus === "loading";

  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "Hey 👋 I’m new here!",
    location: user?.location || "",
    website: user?.website || "",
    avatarUrl: user?.avatarUrl || DEFAULT_AVATAR,
  });

  useEffect(() => {
    // Update form when user prop changes
    setForm({
      name: user?.name || "",
      bio: user?.bio || "Hey 👋 I’m new here!",
      location: user?.location || "",
      website: user?.website || "",
      avatarUrl: user?.avatarUrl || DEFAULT_AVATAR,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    if (form.website && !/^https?:\/\/.+/i.test(form.website)) {
      alert("Enter a valid website URL (must start with http/https)");
      return;
    }

    if (!user?.$id) {
      alert("User ID missing. Cannot update profile.");
      return;
    }

    try {
      const payload = {
        profileId: user.$id,
        profileData: form,
      };
      await dispatch(updateProfile(payload)).unwrap();
      onSaveSuccess?.(form); // callback on successful save
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      alert(err || "Failed to update profile");
    }
  };

  return (
    <Card className="max-w-xl mx-auto shadow-sm">
      <Card.Header>
        <Card.Title>Edit Profile</Card.Title>
      </Card.Header>
      <Card.Content>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={form.avatarUrl || DEFAULT_AVATAR}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <Input
              label="Avatar URL"
              name="avatarUrl"
              value={form.avatarUrl}
              onChange={handleChange}
              placeholder="Paste image URL"
            />
          </div>

          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <Textarea
            label="Bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
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
            placeholder="https://example.com"
          />

          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card.Content>
    </Card>
  );
};

export default EditProfileForm;
