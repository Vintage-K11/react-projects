// src/components/blog/PostDetail.jsx
import { Calendar, User } from "lucide-react"
import UserAvatar from "../common/UserAvatar"

const PostDetail = ({ post }) => {
  if (!post) {
    return (
      <p className="text-center text-muted-foreground py-10">
        Post not found.
      </p>
    )
  }

  const { title, content, image, author, date } = post

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Featured Image */}
      {image && (
        <div className="w-full max-h-[500px] mb-8 overflow-hidden rounded-2xl shadow">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
        <span className="flex items-center gap-2">
          <UserAvatar name={author} size="sm" />
          <span>{author}</span>
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={16} /> {new Date(date).toLocaleDateString()}
        </span>
      </div>

      {/* Post Content (TinyMCE output) */}
      <div
        className="prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}

export default PostDetail
