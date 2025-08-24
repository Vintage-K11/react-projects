import React, {useState, useEffect} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { Query } from 'appwrite'

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPosts([Query.equal("slug", slug)]).then((posts) => {
                if (posts && posts.documents.length > 0) {
                    const foundPost = posts.documents[0];
                    setPosts(foundPost);
                } else {
                    navigate('/');
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
  ) : null
}


export default EditPost
