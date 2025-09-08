// src/components/profile/ProfileStats.jsx
import { Card} from "../common/Card";

const ProfileStats = ({ stats }) => {
  if (!stats) return null;

  const { posts, followers, following, comments } = stats;

  return (
    <Card className="shadow-sm">
      <Card.Content className="flex justify-around text-center py-4">
        <div>
          <p className="text-xl font-bold">{posts || 0}</p>
          <p className="text-sm text-muted-foreground">Posts</p>
        </div>
        <div>
          <p className="text-xl font-bold">{followers || 0}</p>
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
        <div>
          <p className="text-xl font-bold">{following || 0}</p>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
        <div>
          <p className="text-xl font-bold">{comments || 0}</p>
          <p className="text-sm text-muted-foreground">Comments</p>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileStats;
