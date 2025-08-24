import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'
import { setPosts } from '../store/postSlice'
import { Container, PostCard } from '../components'

function AllPosts() {
    const posts = useSelector((state) => state.post.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                dispatch(setPosts(posts.documents))
            }
        })
    }, [dispatch])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap '>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
