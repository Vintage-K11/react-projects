// // src/components/blog/PostList.jsx
// import PostCard from "./PostCard";

// const PostList = ({ posts }) => {
//   if (!posts || posts.length === 0) {
//     return <p className="text-center text-muted-foreground">No posts available.</p>;
//   }

//   return (
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {posts.map((post) => (
//         <PostCard
//           key={post.slug}
//           title={post.title}
//           excerpt={post.excerpt}
//           author={post.author}
//           date={post.date}
//           slug={post.slug}
//           image={post.image}
//         />
//       ))}
//     </div>
//   );
// };

// export default PostList;

import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts = [], className, ...props }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground" {...props}>
        No posts available.
      </div>
    );
  }

  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className || ""}`} {...props}>
      {posts.map((post) => (
        <PostCard key={post.id || post.slug} {...post} />
      ))}
    </div>
  );
};

export default PostList;
