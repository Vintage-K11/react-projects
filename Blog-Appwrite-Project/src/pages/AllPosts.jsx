// import React, {useState, useEffect} from 'react'
// import { Container, PostCard } from '../components'
// import appwriteService from "../appwrite/config";

// function AllPosts() {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {
//         appwriteService.getPosts([]).then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])
//   return (
//     <div className='w-full py-8'>
//         <Container>
//             <div className='flex flex-wrap'>
//                 {posts.map((post) => (
//                     <div key={post.$id} className='p-2 w-1/4'>
//                         <PostCard {...post} />
//                     </div>
//                 ))}
//             </div>
//             </Container>
//     </div>
//   )
// }

// export default AllPosts

// src/pages/AllPosts.jsx
import PostList from "../components/blog/PostList";
import { Card } from "../components/common/Card";
import { useEffect, useState } from "react";
import  PostCardSkeleton from "../components/common/skeletons/PostCardSkeleton";

const AllPosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with backend fetch (Appwrite/REST API)
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: "Why React is Still King in 2025",
          image: "/assets/sample1.jpg",
          author: "Vishal Kharbanda",
          date: "2025-09-06",
          excerpt: "React continues to dominate frontend dev with hooks, suspense, and concurrent features...",
        },
        {
          id: 2,
          title: "AI + Web Dev: Future of Coding",
          image: "/assets/sample2.jpg",
          author: "John Doe",
          date: "2025-09-01",
          excerpt: "The merge of AI with development is creating new possibilities for building apps...",
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">All Blog Posts</h1>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          No posts available.
        </Card>
      )}
    </div>
  );
};

export default AllPosts;
