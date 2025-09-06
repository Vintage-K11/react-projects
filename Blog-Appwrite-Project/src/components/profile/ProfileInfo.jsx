// src/components/profile/ProfileInfo.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../common/Card";

const ProfileInfo = ({ bio, location, website }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
