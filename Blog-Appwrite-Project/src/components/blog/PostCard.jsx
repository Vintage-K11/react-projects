// src/components/blog/PostCard.jsx
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Link } from "react-router-dom";
import PostMeta from "./PostMeta";

const PostCard = ({
  id,
  slug,
  title = "Untitled Post",
  excerpt = "",
  author = "Anonymous",
  date = new Date().toISOString(),
  image = "https://source.unsplash.com/600x400/?nature",
  ...props
}) => {
  const postLink = `/post/${slug || id || "unknown-post"}`;

  return (
    <Card
      className="hover:shadow-md transition-shadow duration-200 overflow-hidden"
      {...props}
    >
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
        {excerpt && (
          <Card.Description className="line-clamp-3">{excerpt}</Card.Description>
        )}
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
