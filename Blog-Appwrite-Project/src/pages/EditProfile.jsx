import React, { useEffect, useState } from "react";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: fetch current user
    setUser({
      name: "Vishal",
      bio: "Frontend dev",
      location: "India",
      website: "https://example.com",
    });
  }, []);

  const handleSave = (data) => {
    // TODO: update backend
    console.log("Save profile", data);
    navigate("/profile");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <EditProfileForm user={user} onSave={handleSave} />
    </div>
  );
};

export default EditProfile;
