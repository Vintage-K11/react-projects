// src/components/profile/EditProfileForm.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import Textarea from "../common/Textarea";
import { Card } from "../common/Card";
import { updateProfile, selectProfileUpdateStatus } from "@/store/profileSlice";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&f=y";

const EditProfileForm = ({ user, onSaveSuccess }) => {
  const dispatch = useDispatch();
  const updateStatus = useSelector(selectProfileUpdateStatus);
  const isSaving = updateStatus === "loading";

  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "Hey 👋 I’m new here!",
    location: "",
    website: "",
    avatarUrl: DEFAULT_AVATAR,
  });

  // Populate form when user data changes
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "Hey 👋 I’m new here!",
        location: user.location || "",
        website: user.website || "",
        avatarUrl: user.avatarUrl || DEFAULT_AVATAR,
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.username.trim()) return toast.error("Username is required");
    if (form.website && !/^https?:\/\/.+/i.test(form.website))
      return toast.error("Enter a valid website URL (http/https)");

    if (!user?.$id) return toast.error("User ID missing. Cannot update profile.");

    try {
      const updatedProfile = await dispatch(
        updateProfile({ profileId: user.$id, profileData: form })
      ).unwrap();

      toast.success("✅ Profile updated successfully!");
      onSaveSuccess?.(updatedProfile);
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      toast.error(err?.message || "Failed to update profile");
    }
  };

  return (
    <Card className="max-w-xl mx-auto shadow-sm">
      <Card.Header>
        <Card.Title>Edit Profile</Card.Title>
      </Card.Header>
      <Card.Content>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar */}
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

          <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Username" name="username" value={form.username} onChange={handleChange} required />
          <Textarea label="Bio" name="bio" value={form.bio} onChange={handleChange} rows={3} />
          <Input label="Location" name="location" value={form.location} onChange={handleChange} />
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
