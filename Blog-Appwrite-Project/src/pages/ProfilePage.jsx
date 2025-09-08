import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfilePosts from "@/components/profile/ProfilePosts";
import ProfileSkeleton from "@/components/common/skeletons/ProfileSkeleton";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams(); // or userId
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: fetch user & posts
    setTimeout(() => {
      setUser({
        name: username || "Vishal",
        avatar: "https://source.unsplash.com/80x80/?face",
        coverImage: "https://source.unsplash.com/1200x300/?landscape",
        bio: "Frontend developer and writer.",
        location: "India",
        website: "https://example.com",
      });
      setPosts([
        {
          id: "p1",
          slug: "post-one",
          title: "My First Post",
          excerpt: "Short excerpt",
          author: username || "Vishal",
          date: "2025-08-20",
          image: "https://source.unsplash.com/600x400/?nature",
        },
      ]);
      setLoading(false);
    }, 800);
  }, [username]);

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <ProfileHeader user={user} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfilePosts posts={posts} />
        </div>
        <aside className="space-y-4">
          <ProfileInfo bio={user.bio} location={user.location} website={user.website} />
          <ProfileStats stats={{ posts: posts.length, followers: 120, following: 10, comments: 45 }} />
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
