// import React, {useEffect, useState} from 'react'
// import appwriteService from "../appwrite/config";
// import {Container, PostCard} from '../components'

// function Home() {
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         appwriteService.getPosts().then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])
  
//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 Login to read posts
//                             </h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     {posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/2'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Home

// src/pages/HomePage.jsx
import { Button } from "@/components/common/Button";
import PostCard from "@/components/blog/PostCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  // Mock data – in real app, this will come from backend
  const recentPosts = [
    {
      id: 2,
      slug: "javascript-tricks",
      title: "10 JavaScript Tricks You Didn’t Know",
      excerpt: "Boost your coding productivity with these hidden gems...",
      author: "Guest Author",
      date: "2025-08-25",
      image: "https://source.unsplash.com/600x400/?javascript,coding",
    },
    {
      id: 3,
      slug: "ai-writing",
      title: "How AI is Changing Content Creation",
      excerpt: "From brainstorming to drafting – AI tools are reshaping blogging...",
      author: "Admin",
      date: "2025-08-20",
      image: "https://source.unsplash.com/600x400/?ai,blogging",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to Our Blogging Platform
        </h1>
        <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
          Share your thoughts, explore inspiring stories, and join a thriving
          community of writers.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" variant="default" className="bg-white text-indigo-600">
              Start Writing
            </Button>
          </Link>
          <Link to="/posts">
            <Button size="lg" variant="outline" className="text-white bg-amber-600 border-white">
              Explore Posts
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/posts">
            <Button variant="default">View All Posts</Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Ready to share your story?</h2>
        <p className="text-muted-foreground mb-6">
          Join our platform and start creating impactful content today.
        </p>
        <Link to="/signup">
          <Button size="lg">Get Started</Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
