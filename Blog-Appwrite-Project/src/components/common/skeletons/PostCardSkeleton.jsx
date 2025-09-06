// src/components/common/skeletons/PostCardSkeleton.jsx
import { Skeleton } from "../skeletons/Skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <Skeleton className="w-full h-48" /> {/* Image */}
      <div className="p-4 space-y-3">
        <Skeleton className="w-3/4 h-6" /> {/* Title */}
        <Skeleton className="w-full h-4" /> {/* Excerpt line 1 */}
        <Skeleton className="w-full h-4" /> {/* Excerpt line 2 */}
        <Skeleton className="w-1/2 h-4" /> {/* Excerpt line 3 */}
        <div className="flex items-center gap-2 mt-4">
          <Skeleton className="w-8 h-8 rounded-full" /> {/* Author avatar */}
          <Skeleton className="w-1/4 h-4" /> {/* Author name/date */}
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
