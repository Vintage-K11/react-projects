// import React from 'react'
// import appwriteService from "../appwrite/config"
// import {Link} from 'react-router-dom'

// function PostCard({$id, title, featuredImage}) {
    
//   return (
//     <Link to={`/post/${$id}`}>
//         <div className='w-full bg-gray-100 rounded-xl p-4'>
//             <div className='w-full justify-center mb-4'>
//                 <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
//                 className='rounded-xl' />

//             </div>
//             <h2
//             className='text-xl font-bold'
//             >{title}</h2>
//         </div>
//     </Link>
//   )
// }


// export default PostCard

import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Link } from "react-router-dom";
import PostMeta from "./PostMeta";

const PostCard = ({
  id,
  slug,
  title = "Untitled Post",
  excerpt = "",
  author,
  date,
  image,
  ...props
}) => {
  const postLink = `/post/${slug || id}`;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 overflow-hidden" {...props}>
      {/* Post Image */}
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Post Header */}
      <Card.Header>
        <Card.Title className="text-xl font-semibold line-clamp-2">
          <Link to={postLink}>{title}</Link>
        </Card.Title>
        {excerpt && <Card.Description className="line-clamp-3">{excerpt}</Card.Description>}
      </Card.Header>

      {/* Post Content */}
      <Card.Content>
        <div className="flex items-center justify-between mt-4">
          <PostMeta author={author} date={date} />
          <Link to={postLink}>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </Link>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
