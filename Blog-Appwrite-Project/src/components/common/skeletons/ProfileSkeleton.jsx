// src/components/common/skeletons/ProfileSkeleton.jsx
import { Skeleton } from "../skeletons/Skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <Skeleton className="w-16 h-16 rounded-full" /> {/* Avatar */}
        <div className="space-y-2">
          <Skeleton className="w-32 h-6" /> {/* Name */}
          <Skeleton className="w-24 h-4" /> {/* Username */}
        </div>
      </div>

      {/* Profile Stats */}
      <div className="flex gap-6">
        <Skeleton className="w-16 h-4" /> {/* Stat 1 */}
        <Skeleton className="w-16 h-4" /> {/* Stat 2 */}
        <Skeleton className="w-16 h-4" /> {/* Stat 3 */}
      </div>

      {/* Bio / Description */}
      <Skeleton className="w-full h-16 rounded-md" /> {/* Bio */}
      
      {/* Posts List */}
      <div className="space-y-6">
        <Skeleton className="w-full h-48 rounded-lg" /> {/* Post 1 */}
        <Skeleton className="w-full h-48 rounded-lg" /> {/* Post 2 */}
        <Skeleton className="w-full h-48 rounded-lg" /> {/* Post 3 */}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
