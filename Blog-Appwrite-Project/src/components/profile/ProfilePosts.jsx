// src/components/profile/ProfilePosts.jsx
import PostCard from "../blog/PostCard";

const ProfilePosts = ({ posts = [] }) => {
  if (!posts.length) {
    return (
      <p
        className="text-center text-muted-foreground py-10"
        aria-live="polite"
      >
        No posts published yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => {
        const postId = post.$id || post.id || `post-${Math.random()}`;
        return (
          <PostCard
            key={postId}
            post={{
              id: postId,
              title: post.title || "Untitled Post",
              excerpt: post.excerpt || "",
              slug: post.slug || "",
              image: post.image || "https://source.unsplash.com/600x400/?nature",
              date: post.date || post.$createdAt || new Date().toISOString(),
              author: post.author || "Anonymous",
            }}
          />
        );
      })}
    </div>
  );
};

export default ProfilePosts;
