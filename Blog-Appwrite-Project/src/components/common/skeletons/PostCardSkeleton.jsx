// src/components/common/skeletons/PostCardSkeleton.jsx
import { Skeleton } from "../skeletons/Skeleton";

const PostCardSkeleton = () => {
  return (
    <div className=" rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-48" /> 

      <div className="p-6 space-y-4">
        {/* Title Skeleton */}
        <Skeleton className="w-3/4 h-6" /> 

        {/* Excerpt Lines */}
        <Skeleton className="w-full h-4" /> 
        <Skeleton className="w-full h-4" /> 
        <Skeleton className="w-3/4 h-4" /> 

        {/* Author Section */}
        <div className="flex items-center gap-4 mt-4">
          {/* Author Avatar */}
          <Skeleton className="w-10 h-10 rounded-full" /> 
          
          {/* Author Name / Date */}
          <Skeleton className="w-1/3 h-4" /> 
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
