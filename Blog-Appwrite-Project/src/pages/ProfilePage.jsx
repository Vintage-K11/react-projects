// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfilePosts from "@/components/profile/ProfilePosts";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ProfileSkeleton from "@/components/common/skeletons/ProfileSkeleton";

import {
  fetchProfile,
  selectProfile,
  selectProfileFetchStatus,
  updateProfile,
} from "@/store/profileSlice";
import { selectCurrentUser } from "@/store/authSlice";

const ProfilePage = () => {
  const { username } = useParams(); // optional, can fetch by username later
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const profile = useSelector(selectProfile);
  const fetchStatus = useSelector(selectProfileFetchStatus);

  const [editing, setEditing] = useState(false);
  const [posts, setPosts] = useState([]);

  const isOwnProfile = profile?.userId === currentUser?.$id;

  // Fetch profile when currentUser changes
  useEffect(() => {
    if (currentUser?.$id) {
      dispatch(fetchProfile(currentUser.$id));
    }
  }, [currentUser, dispatch]);

  // Sync posts (replace with Appwrite posts fetch if available)
  useEffect(() => {
    if (profile) {
      setPosts(profile.posts || []);
    }
  }, [profile]);

  // Handle profile update
  const handleSaveProfile = async (updatedData) => {
    if (!profile) return;

    try {
      await dispatch(
        updateProfile({ profileId: profile.$id, profileData: updatedData })
      ).unwrap();
      setEditing(false);
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      alert(err || "Failed to update profile");
    }
  };

  if (fetchStatus === "loading" || !profile) return <ProfileSkeleton />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      {/* Profile Header */}
      <ProfileHeader
        user={{
          name: profile.name,
          avatar: profile.avatarUrl || "https://www.gravatar.com/avatar/?d=mp&f=y",
          coverImage: profile.coverImage || "https://source.unsplash.com/1200x300/?landscape",
        }}
        isOwnProfile={isOwnProfile}
        onEdit={() => setEditing(true)}
      />

      {/* Edit Profile Form */}
      {editing && isOwnProfile && (
        <EditProfileForm
          user={profile}
          onSave={handleSaveProfile}
          isSaving={fetchStatus === "loading"}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts Section */}
        <div className="lg:col-span-2 space-y-6">
          <ProfilePosts posts={posts} />
        </div>

        {/* Sidebar Section */}
        <aside className="space-y-4">
          <ProfileInfo
            bio={profile.bio}
            location={profile.location}
            website={profile.website}
          />
          <ProfileStats
            stats={{
              posts: posts.length,
              followers: profile.followers || 0,
              following: profile.following || 0,
              comments: profile.comments || 0,
            }}
          />
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
