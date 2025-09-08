// import React from 'react'
// import { Container, PostForm } from '../components'

// function AddPost() {
//   return (
//     <div className='py-8'>
//         <Container>
//             <PostForm />
//         </Container>
//     </div>
//   )
// }

// export default AddPost

import React from "react";
import CreatePostForm from "@/components/blog/CreatePostForm";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();

  const handleCreate = (data) => {
    // TODO: send to Appwrite / API
    console.log("Create post:", data);
    // mock created id/slug:
    const newId = Date.now().toString();
    navigate(`/post/${newId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <CreatePostForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreatePostPage;
