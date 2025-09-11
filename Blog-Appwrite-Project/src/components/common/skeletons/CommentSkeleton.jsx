// src/components/common/skeletons/CommentSkeleton.jsx
import { Skeleton } from "../skeletons/Skeleton";

const CommentSkeleton = () => {
  return (
    <div className="flex gap-4 p-5 border-muted rounded-md bg-white">
      {/* Avatar */}
      <Skeleton className="w-12 h-12 rounded-full" /> 

      {/* Comment Content */}
      <div className="flex-1 space-y-3">
        {/* Name Skeleton */}
        <Skeleton className="w-1/4 h-4 rounded" /> 
        
        {/* Comment Skeleton */}
        <Skeleton className="w-full h-3 rounded" /> 
        <Skeleton className="w-3/4 h-3 rounded" /> 
      </div>
    </div>
  );
};

export default CommentSkeleton;
