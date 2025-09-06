// src/components/common/skeletons/ProfileSkeleton.jsx
import { Skeleton } from "../skeletons/Skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" /> {/* Avatar */}
        <div className="space-y-2">
          <Skeleton className="w-32 h-6" /> {/* Name */}
          <Skeleton className="w-24 h-4" /> {/* Username */}
        </div>
      </div>

      {/* Profile Stats */}
      <div className="flex gap-4">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-16 h-4" />
      </div>

      {/* Bio / Description */}
      <Skeleton className="w-full h-16 rounded" />

      {/* Posts List */}
      <div className="space-y-4">
        <Skeleton className="w-full h-48 rounded-lg" />
        <Skeleton className="w-full h-48 rounded-lg" />
        <Skeleton className="w-full h-48 rounded-lg" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
