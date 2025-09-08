// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post?.userId && userData?.$id ? post.userId === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         if (!post?.$id) return;
        
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 // Always attempt to delete the image - the deleteFile method now handles invalid file IDs safely
//                 appwriteService.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };

//     return post ? (
//         <div className="py-8">
//             <Container>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     {post.featuredImage && (
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredImage)}
//                             alt={post.title}
//                             className="rounded-xl"
//                         />
//                     )}

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                     </div>
//             </Container>
//         </div>
//     ) : null;
// }


// src/pages/PostPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../components/blog/PostDetails";
import CommentList from "../components/comment/CommentList";
import CommentForm from "../components/comment/CommentForm";
import  CommentSkeleton from "../components/common/skeletons/CommentSkeleton";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with backend fetch
    setTimeout(() => {
      setPost({
        id,
        title: "Demo Post Title",
        content:
          "<p>This is a <strong>demo post</strong> rendered from RTE HTML.</p>",
        image: "/assets/sample1.jpg",
        author: "Vishal",
        date: "2025-09-01",
      });

      setComments([
        { id: 1, author: "John", content: "Great post!", date: "2025-09-02" },
        { id: 2, author: "Emily", content: "Really helpful!", date: "2025-09-03" },
      ]);
      setLoading(false);
    }, 1000);
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {post && <PostDetail post={post} />}

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        ) : (
           <>
            <CommentList comments={comments} />
            <div className="mt-6">
              <CommentForm postId={post?.id} onSubmit={handleAddComment} />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default PostPage;
