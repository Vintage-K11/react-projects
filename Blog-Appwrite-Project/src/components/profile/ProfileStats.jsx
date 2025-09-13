// src/components/profile/ProfileStats.jsx
import { Card } from "../common/Card";

const ProfileStats = ({ stats = {} }) => {
  const { posts = 0, followers = 0, following = 0, comments = 0 } = stats;

  return (
    <Card className="shadow-sm">
      <Card.Content className="flex justify-around text-center py-4">
        <div>
          <p className="text-xl font-bold">{posts}</p>
          <p className="text-sm text-muted-foreground">Posts</p>
        </div>
        <div>
          <p className="text-xl font-bold">{followers}</p>
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
        <div>
          <p className="text-xl font-bold">{following}</p>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
        <div>
          <p className="text-xl font-bold">{comments}</p>
          <p className="text-sm text-muted-foreground">Comments</p>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileStats;
