import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { addPost, deletePost as deletePostAction } from "../store/postSlice";
import { Query } from "appwrite";

export default function Post() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.posts);
    const post = posts.find((post) => post.slug === slug);

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (!post) {
            // We need to find the post by slug from the database
            // This requires updating the appwrite service to support slug-based queries
            appwriteService.getPosts([Query.equal("slug", slug)]).then((posts) => {
                if (posts && posts.documents.length > 0) {
                    const foundPost = posts.documents[0];
                    dispatch(addPost(foundPost));
                } else {
                    navigate("/");
                }
            });
        }
    }, [slug, navigate, post, dispatch]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                dispatch(deletePostAction(post.$id));
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.slug}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
