import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import UserAvatar from "../common/UserAvatar";
import InlineEdit from "./InlineEdit"; // Import the new component
import ImageEdit from "./ImageEdit"; // Import the new image edit component
import { updateProfile, updateProfileImage } from "@/store/profileSlice";

const ProfileHeader = ({ profile, isOwner }) => {
  const dispatch = useDispatch();
  if (!profile) return null;

  const handleProfileSave = (data) => {
    const promise = dispatch(
      updateProfile({ profileId: profile.$id, profileData: data })
    ).unwrap();

    toast.promise(promise, {
      loading: "Saving...",
      success: "Profile updated!",
      error: "Failed to update.",
    });
  };

  const handleImageSave = (fieldName) => async (file) => {
    return dispatch(
      updateProfileImage({ profile, fieldName, file })
    ).unwrap();
  };

  // TODO: Implement follow/unfollow logic
  const onFollow = () => toast("Follow feature coming soon!");

  const { name, username, avatarUrl, coverImageUrl, headline, location, followers, following } = profile;

  return (
    <Card className="overflow-visible shadow-sm">
      {/* Cover Image using a div with background image */}
      <ImageEdit
        isOwner={isOwner}
        onSave={handleImageSave('coverImageUrl')}
        className="h-48 sm:h-64 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${coverImageUrl || "/Cover1.png"})`,
          }}
        />
      </ImageEdit>

      {/* Card Content for the rest of the profile info */}
      <Card.Content className="relative px-6 pb-6">
        {/* Avatar and Action Buttons */}
        <div className="flex justify-between items-start -mt-16">
          <ImageEdit
            isOwner={isOwner}
            onSave={handleImageSave('avatarUrl')}
            className="w-32 h-32 rounded-full"
            overlayClassName="rounded-full"
          >
            <UserAvatar src={avatarUrl} alt={name} className="w-32 h-32 border-4 border-background shadow-lg" />
          </ImageEdit>

          <div className="pt-16">
            {isOwner ? (
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                // This button could be for something else now, like "View as Public"
              >View as Public</Button>
            ) : (
              <Button
                onClick={onFollow}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Follow
              </Button>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="mt-4">
          <InlineEdit
            value={name}
            onSave={(data) => handleProfileSave(data)}
            isOwner={isOwner}
            fieldName="name"
            as="h1"
            className="text-2xl sm:text-3xl font-bold"
          />
          <p className="text-sm text-muted-foreground">@{username}</p>
          <InlineEdit
            value={headline || "Blogger & Storyteller"}
            onSave={(data) => handleProfileSave(data)}
            isOwner={isOwner}
            fieldName="headline"
            as="p"
            className="text-lg mt-1"
            placeholder="Your headline..."
          />
          {/* Location can also be converted to an InlineEdit component */}
          <p className="text-sm text-muted-foreground mt-1">{location || "Planet Earth"}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
          <div><span className="font-bold text-primary">{profile.followers?.length || 0}</span> Followers</div>
          <div><span className="font-bold text-primary">{profile.following?.length || 0}</span> Following</div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileHeader;
