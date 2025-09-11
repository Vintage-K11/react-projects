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

// // src/pages/HomePage.jsx
// import { Button } from "@/components/common/Button";
// import PostCard from "@/components/blog/PostCard";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   // Mock data – in real app, this will come from backend
//   const recentPosts = [
//     {
//       id: 2,
//       slug: "javascript-tricks",
//       title: "10 JavaScript Tricks You Didn’t Know",
//       excerpt: "Boost your coding productivity with these hidden gems...",
//       author: "Guest Author",
//       date: "2025-08-25",
//       image: "https://source.unsplash.com/600x400/?javascript,coding",
//     },
//     {
//       id: 3,
//       slug: "ai-writing",
//       title: "How AI is Changing Content Creation",
//       excerpt: "From brainstorming to drafting – AI tools are reshaping blogging...",
//       author: "Admin",
//       date: "2025-08-20",
//       image: "https://source.unsplash.com/600x400/?ai,blogging",
//     },
//   ];

//   return (
//     <div className="space-y-16">
//       {/* Hero Section */}
//       <section className="text-center py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
//         <h1 className="text-4xl sm:text-5xl font-bold mb-4">
//           Welcome to Our Blogging Platform
//         </h1>
//         <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
//           Share your thoughts, explore inspiring stories, and join a thriving
//           community of writers.
//         </p>
//         <div className="flex gap-4 justify-center">
//           <Link to="/signup">
//             <Button size="lg" variant="default" className="bg-white text-indigo-600">
//               Start Writing
//             </Button>
//           </Link>
//           <Link to="/posts">
//             <Button size="lg" variant="outline" className="text-white bg-amber-600 border-white">
//               Explore Posts
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Recent Posts */}
//       <section className="max-w-6xl mx-auto px-4">
//         <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {recentPosts.map((post) => (
//             <PostCard key={post.id} {...post} />
//           ))}
//         </div>
//         <div className="text-center mt-8">
//           <Link to="/posts">
//             <Button variant="default">View All Posts</Button>
//           </Link>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="text-center py-16 bg-gray-100">
//         <h2 className="text-3xl font-bold mb-4">Ready to share your story?</h2>
//         <p className="text-muted-foreground mb-6">
//           Join our platform and start creating impactful content today.
//         </p>
//         <Link to="/signup">
//           <Button size="lg">Get Started</Button>
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default HomePage;


import React from "react";
// import Container from "@/components/layout/layoutcomponents/Container";
import heroImage from '../assets/home/mountain.jpg'
import missionvid from '../assets/vids/Campfire-Night.webm'
import quotevid from '../assets/vids/world-connect.webm'
import ctavid from '../assets/vids/Collab.webm'
import Team from '../assets/home/team.svg'

import img1 from '../assets/home/fit.webp';
import img2 from '../assets/home/beach.webp';
import img3 from '../assets/home/fruit.webp';

const featuredBlogs = [
  {
    id: 1,
    title: "Understanding React Hooks",
    author: "Jane Doe",
    image: img1,
  },
  {
    id: 2,
    title: "Styling with Tailwind CSS",
    author: "John Smith",
    image: img2,
  },
  {
    id: 3,
    title: "Building Scalable Apps",
    author: "Alice Johnson",
    image: img3, 
  },
];

export default function HomePage() {
  return (
    <div className="font-sans text-gray-900">
          {/* Hero Section */}
          <section
          className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl text-white font-serif">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                Where Quiet Minds Meet Good Stories
              </h1>
              <p className="text-lg md:text-2xl mb-8 drop-shadow-md leading-relaxed">
                Rustic Reads is your digital cabin in the hills — a place for short, soulful stories that linger longer than the scroll.
              </p>
              <button className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition font-sans">
                Step Inside
              </button>
          </div>

        </section>



        {/* Two Column Section */}
        <section className="max-w-7xl mx-auto my-32 px-6 md:px-16 lg:px-24 flex flex-col gap-28">
          {/* First part: Mission + Main Illustration */}
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-28">
            {/* Left column: Mission Statement */}
            <div className="md:w-1/2">
              <h2 className="text-4xl font-semibold text-gray-900 mb-8 leading-tight tracking-wide">
                Why Choose Rustic Reads?
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                At Rustic Reads, we celebrate the beauty of storytelling from every corner of the world. Our platform brings together diverse voices, with short stories that inspire, entertain, and connect. Whether it’s a heartfelt tale, a suspenseful adventure, or a whimsical journey, each story at Rustic Reads has the power to transport, inspire, and unite.
              </p>
              <button className="mt-4 py-3 px-6 bg-indigo-600 text-white font-medium text-lg rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
                Explore Stories
              </button>
            </div>

            {/* Right column: Main Illustration */}
            <div className="md:w-1/2 relative min-h-[500px]">
              <video className="w-full h-full object-contain" autoPlay loop muted>
                {/* Use the imported missionvid */}
                <source src={missionvid} type="video/webm" />
                {/* Fallback message */}
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Second part: Swap Illustration and Quote */}
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-28">
            {/* Left column: Second Illustration */}
            <div className="md:w-1/2 relative min-h-[500px]">
              <video className="w-full h-full object-contain" autoPlay loop muted>
                {/* Use another imported video for the second illustration */}
                <source src={quotevid} type="video/webm" />
                {/* Fallback message */}
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Right column: Quote */}
            <div className="md:w-1/2 text-center md:text-left">
              <blockquote className="text-3xl font-semibold text-gray-800 italic mb-8 leading-relaxed">
                “The world is a book, and those who do not read only see one page.” — Saint Augustine
              </blockquote>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                At Rustic Reads, we believe in giving you access to the diverse stories that shape our world, one page at a time.
              </p>
            </div>
          </div>
        </section>



      {/* Featured Blogs Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 my-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Blogs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredBlogs.map(({ id, title, author, image }) => (
            <div
              key={id}
              className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              style={{ minHeight: "300px" }}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-sm mt-1">By {author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
<section
  className="max-w-7xl mx-auto my-16 py-4 px-40 rounded-3xl"
  style={{
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(191, 219, 254, 0.4), transparent 70%),
      radial-gradient(circle at 80% 70%, rgba(251, 207, 232, 0.4), transparent 70%),
      linear-gradient(to top right, #e0f2fe, #fce7f3)
    `,
  }}
>  {/* Animated morphing blurred shape */}
  <div
    aria-hidden="true"
    className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-300 via-pink-300 to-pink-400 opacity-30 blur-3xl rounded-full animate-morph-slow"
    style={{
      filter: 'blur(120px)',
      animationTimingFunction: 'ease-in-out',
    }}
  ></div>

  <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
   <div className="max-w-xl mx-auto md:mx-0 px-4 md:px-0 font-serif">
  <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 mb-6 tracking-tight">
    Write. Read. Belong.
  </h2>
  <p className="text-lg sm:text-xl text-gray-700 mb-10 leading-relaxed">
    Join a growing collective of storytellers shaping voices that matter. Whether you're a reader, a writer, or just curious — Rustic Reads is your creative corner on the web.
  </p>
  <button
    className="inline-block rounded-full bg-pink-500 px-10 py-3 text-base font-semibold text-white shadow-md hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transition font-sans"
    aria-label="Join the Rustic Reads collective"
  >
    Join the Collective
  </button>
</div>


    {/* Animation placeholder */}
    <div className="w-full flex justify-center px-4 md:px-0">
       <img src={Team} alt="team" />
    </div>
  </div>

  {/* Add keyframes for morph animation */}
  <style jsx>{`
    @keyframes morph {
      0%, 100% {
        border-radius: 40% 60% 70% 30% / 50% 40% 60% 50%;
        transform: translate(0, 0) scale(1);
      }
      50% {
        border-radius: 60% 40% 30% 70% / 40% 60% 50% 60%;
        transform: translate(30px, 20px) scale(1.1);
      }
    }
    .animate-morph-slow {
      animation: morph 15s infinite alternate;
    }
  `}</style>
</section>


      
    </div>
  );
}
