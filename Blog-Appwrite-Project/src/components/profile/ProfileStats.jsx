// src/components/profile/ProfileStats.jsx
import { Card } from "../common/Card";

const ProfileStats = ({ stats = {} }) => {
  const { posts = 0, followers = 0, following = 0, comments = 0 } = stats;

  const statItems = [
    { label: "Posts", value: posts },
    { label: "Followers", value: followers },
    { label: "Following", value: following },
    { label: "Comments", value: comments },
  ];

  return (
    <Card className="shadow-sm">
      <Card.Content className="flex justify-around text-center py-4">
        {statItems.map(({ label, value }) => (
          <div key={label} aria-label={`${value} ${label}`}>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
};

export default ProfileStats;
