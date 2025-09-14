// src/components/profile/ProfileHeader.jsx
import { Card } from "../common/Card";
import { Button } from "../common/Button";

const ProfileHeader = ({ user, isOwnProfile = false, onEdit, roleLabel = "Blogger • Member" }) => {
  if (!user) return null;

  const { name, avatar, coverImage } = user;

  return (
    <Card className="overflow-hidden shadow-sm relative">
      {/* Cover Image */}
      <div className="h-40 sm:h-56 w-full overflow-hidden relative">
        <img
          src={coverImage || "/default-cover.jpg"}
          alt={`${name}'s cover`}
          className="w-full h-full object-cover"
        />
        {isOwnProfile && onEdit && (
          <div className="absolute top-2 right-2">
            <Button
              size="sm"
              onClick={onEdit}
              className="bg-primary text-white hover:bg-primary/80 shadow-md transition-all"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </div>

      {/* Avatar and Name */}
      <Card.Content className="flex items-center gap-4 -mt-12 sm:-mt-16 px-6">
        <img
          src={avatar || "/default-avatar.png"}
          alt={name || "User Avatar"}
          className="w-24 h-24 rounded-full border-4 border-background shadow-lg transition-transform hover:scale-105"
        />
        <div>
          <h2 className="text-2xl font-bold">{name || "Unnamed User"}</h2>
          <p className="text-sm text-muted-foreground">{roleLabel}</p>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileHeader;
