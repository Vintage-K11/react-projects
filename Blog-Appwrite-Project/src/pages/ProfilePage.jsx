// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfilePosts from "@/components/profile/ProfilePosts";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ProfileSkeleton from "@/components/common/skeletons/ProfileSkeleton";

import {
  fetchProfileByUsername,
  updateProfile,
  selectProfile,
  selectProfileFetchStatus,
} from "@/store/profileSlice";
import { selectCurrentUser } from "@/store/authSlice";

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const profile = useSelector(selectProfile);
  const fetchStatus = useSelector(selectProfileFetchStatus);

  const [editing, setEditing] = useState(false);
  const [posts, setPosts] = useState([]);

  const isOwnProfile = profile?.userId === currentUser?.$id;

  // Fetch profile by username
  useEffect(() => {
    if (username) {
      dispatch(fetchProfileByUsername(username));
    } else if (currentUser?.username) {
      dispatch(fetchProfileByUsername(currentUser.username));
    }
  }, [username, currentUser, dispatch]);

  // Update posts when profile changes
  useEffect(() => {
    setPosts(profile?.posts || []);
  }, [profile]);

  // Handle profile update
  const handleSaveProfile = async (updatedData) => {
    if (!profile) return;

    try {
      const updatedProfile = await dispatch(
        updateProfile({ profileId: profile.$id, profileData: updatedData })
      ).unwrap();

      toast.success("✅ Profile updated successfully!");
      setEditing(false);

      // Redirect if username changed
      if (updatedData.username && updatedData.username !== profile.username) {
        navigate(`/profile/${updatedProfile.username}`);
      }
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      toast.error(err?.message || "Failed to update profile");
    }
  };

  // Loading state
  if (fetchStatus === "loading") return <ProfileSkeleton />;

  // Profile not found
  if (!profile) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-500">
        <p>🚫 Profile not found</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {/* Header */}
        <ProfileHeader
          user={{
            name: profile.name,
            avatar:
              profile.avatarUrl || "https://www.gravatar.com/avatar/?d=mp&f=y",
            coverImage:
              profile.coverImageUrl ||
              "https://source.unsplash.com/1200x300/?landscape",
          }}
          isOwnProfile={isOwnProfile}
          onEdit={isOwnProfile ? () => setEditing(true) : undefined}
        />

        {/* Edit Form */}
        {editing && isOwnProfile && (
          <EditProfileForm user={profile} onSaveSuccess={handleSaveProfile} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Posts */}
          <div className="lg:col-span-2 space-y-6">
            <ProfilePosts posts={posts} />
          </div>

          {/* Info + Stats */}
          <aside className="space-y-4">
            <ProfileInfo
              bio={profile.bio}
              location={profile.location}
              website={profile.website}
            />
            <ProfileStats
              stats={{
                posts: posts.length,
                followers: profile.followers?.length || 0,
                following: profile.following?.length || 0,
              }}
            />
          </aside>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
