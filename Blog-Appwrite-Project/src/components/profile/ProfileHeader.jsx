// src/components/profile/ProfileHeader.jsx
import { Card } from "../common/Card";

const ProfileHeader = ({ user }) => {
  if (!user) return null;

  const { name, avatar, coverImage } = user;

  return (
    <Card className="overflow-hidden shadow-sm">
      {/* Cover Image */}
      <div className="h-40 sm:h-56 w-full overflow-hidden">
        <img
          src={coverImage || "/default-cover.jpg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <Card.Content className="flex items-center gap-4 -mt-12 sm:-mt-16 px-6">
        <img
          src={avatar || "/default-avatar.png"}
          alt={name}
          className="w-24 h-24 rounded-full border-4 border-background shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">Blogger • Member</p>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileHeader;
