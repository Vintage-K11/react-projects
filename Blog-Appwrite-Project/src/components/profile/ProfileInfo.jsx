// src/components/profile/ProfileInfo.jsx
import { Card } from "../common/Card";

const ProfileInfo = ({ bio, location, website }) => {
  return (
    <Card className="shadow-sm">
      <Card.Header>
        <Card.Title>About</Card.Title>
      </Card.Header>
      <Card.Content>
        <p className="text-muted-foreground mb-3">{bio || "No bio added yet."}</p>

        <ul className="text-sm space-y-2">
          {location && <li>📍 {location}</li>}
          {website && (
            <li>
              🔗{" "}
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {website}
              </a>
            </li>
          )}
        </ul>
      </Card.Content>
    </Card>
  );
};

export default ProfileInfo;
