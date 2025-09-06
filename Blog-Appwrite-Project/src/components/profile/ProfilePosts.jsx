// src/components/profile/ProfilePosts.jsx
import PostCard from "../blog/PostCard";

const ProfilePosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-10">
        No posts published yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ProfilePosts;
