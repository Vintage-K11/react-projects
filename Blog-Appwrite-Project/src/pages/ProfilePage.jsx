import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePosts from "@/components/profile/ProfilePosts";
import ProfileSkeleton from "@/components/common/skeletons/ProfileSkeleton";
import ProfileDetails from "@/components/profile/ProfileDetails";
import ProfileComments from "@/components/profile/ProfileComments";
import ProfileBookmarks from "@/components/profile/ProfileBookmarks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/Tabs";

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

  const isOwnProfile = profile?.userId === currentUser?.$id;

  // Local state to manage the active tab
  const [activeTab, setActiveTab] = useState('posts');

  // Fetch profile by username
  useEffect(() => {
    if (username) {
      dispatch(fetchProfileByUsername(username));
    } else if (currentUser?.username) {
      dispatch(fetchProfileByUsername(currentUser.username));
    }
  }, [username, currentUser, dispatch]);

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
    <div className="bg-amber-50">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div className="bg-white">
          <ProfileHeader profile={profile} isOwner={isOwnProfile} />
        </div>
        <div className="bg-white">
        <ProfileDetails profile={profile} isOwner={isOwnProfile} />
        </div>
        {/* --- Tabbed Container Layout --- */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs Header */}
         <div className="flex space-x-3 mt-8 px-12 ">
            {/* Posts Tab */}
            <div
              onClick={() => setActiveTab('posts')}
              className={`py-3 px-6 text-sm font-bold cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                activeTab === 'posts'
                  ? 'bg-green-900 text-white'
                  : 'text-gray-600 border-2 border-gray-500 hover:bg-neutral-300 hover:text-gray-700 hover:border-gray-800'
              }`}
            >
              Posts
            </div>

            {/* Comments Tab */}
            <div
              onClick={() => setActiveTab('comments')}
              className={`py-3 px-6 text-sm font-bold cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                activeTab === 'comments'
                 ? 'bg-green-900 text-white'
                  : 'text-gray-600 border-2 border-gray-500 hover:bg-neutral-300 hover:text-gray-700 hover:border-gray-800'
              }`}
            >
              Comments
            </div>

            {/* Bookmarks Tab */}
            <div
              onClick={() => setActiveTab('bookmarks')}
              className={`py-3 px-6 text-sm font-bold cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                activeTab === 'bookmarks'
            ? 'bg-green-900 text-white'
                : 'text-gray-600 border-2 border-gray-500 hover:bg-neutral-300 hover:text-gray-700 hover:border-gray-800'
              }`}
            >
              Bookmarks
            </div>
          </div>


          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'posts' && <ProfilePosts userId={profile.userId} />}
            {activeTab === 'comments' && <ProfileComments userId={profile.userId} />}
            {activeTab === 'bookmarks' && <ProfileBookmarks userId={profile.userId} />}
         </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
