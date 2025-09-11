// import React, {useEffect, useState} from 'react'
// import {Container, PostForm} from '../components'
// import appwriteService from "../appwrite/config";
// import { useNavigate,  useParams } from 'react-router-dom';

// function EditPost() {
//     const [post, setPosts] = useState(null)
//     const {slug} = useParams()
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 if (post) {
//                     setPosts(post)
//                 }
//             })
//         } else {
//             navigate('/')
//         }
//     }, [slug, navigate])
//   return post ? (
//     <div className='py-8'>
//         <Container>
//             <PostForm post={post} />
//         </Container>
//     </div>
//   ) : null
// }

// export default EditPost

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditPostForm from "@/components/blog/EditPostForm";
import PostCardSkeleton from "@/components/common/skeletons/PostCardSkeleton";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: fetch post by id
    setTimeout(() => {
      setPost({
        id,
        title: "Existing Post Title",
        excerpt: "Existing excerpt",
        content: "<p>Existing content</p>",
        image: "https://source.unsplash.com/800x500/?edit,post",
      });
      setLoading(false);
    }, 700);
  }, [id]);

  const handleUpdate = (data) => {
    // TODO: update backend
    console.log("Update post", id, data);
    navigate(`/post/${id}`);
  };

  if (loading) return <PostCardSkeleton />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <EditPostForm post={post} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditPost;
