// src/components/common/skeletons/CommentSkeleton.jsx
import { Skeleton } from "../skeletons/Skeleton";
const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 p-4 border-b border-muted rounded-md">
      <Skeleton className="w-10 h-10 rounded-full" /> {/* Avatar */}
      <div className="flex-1 space-y-2">
        <Skeleton className="w-1/3 h-4 rounded" /> {/* Name */}
        <Skeleton className="w-full h-3 rounded" /> {/* Comment text */}
      </div>
    </div>
  );
};

export default CommentSkeleton;
