import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Card } from "@/components/common/Card";
import InlineEdit from "./InlineEdit";
import Textarea from "../common/Textarea";
import { updateProfile } from "@/store/profileSlice";
import { format } from 'date-fns';
import { Twitter, Github, Linkedin, Youtube, Instagram, Book } from 'lucide-react'; // Import more icons
import SocialLinkEditor from './SocialLinkEditor'; // Import the new component

// A component to render and manage social links
const SocialLinks = ({ links, isOwner, onSave }) => {
  const handleLinkSave = (platform, username) => {
    const newLinks = { ...(links || {}), [platform]: username };
    onSave({ socialLinks: newLinks });
    };
    
    const socialPlatforms = [
    { name: 'twitter', icon: Twitter },
    { name: 'github', icon: Github },
    { name: 'linkedin', icon: Linkedin },
    { name: 'youtube', icon: Youtube },
    { name: 'instagram', icon: Instagram },
    { name: 'medium', icon: Book },
  ];


  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Social Links</h3>
      <div className="flex items-center gap-2">
        {socialPlatforms.map((platform) => (
          <SocialLinkEditor
            key={platform.name}
            isOwner={isOwner}
            platform={platform.name}
            username={links?.[platform.name]}
            icon={platform.icon}
            onSave={handleLinkSave}
          />
        ))}
      </div>
    </div>
  );
};

const ProfileDetails = ({ profile, isOwner }) => {
  const dispatch = useDispatch();

  const handleSave = (data) => {
    const promise = dispatch(
      updateProfile({ profileId: profile.$id, profileData: data })
    ).unwrap();

    toast.promise(promise, {
      loading: "Saving...",
      success: "Profile updated!",
      error: "Failed to update.",
    });
  };

  // Safely format the join date
  const joinedDate = profile?.$createdAt 
    ? format(new Date(profile.$createdAt), 'MMMM yyyy') 
    : 'N/A';

  return (
    <Card>
      <Card.Header>
        <Card.Title>About {profile.name}</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-4">
        {/* --- Biography --- */}
        <InlineEdit
          value={profile.bio || "This user hasn't written a bio yet."}
          onSave={(data) => handleSave(data)}
          isOwner={isOwner}
          fieldName="bio"
          editComponent={Textarea}
          rows={4}
          className="text-muted-foreground"
          placeholder="Tell us about yourself..."
        />

        {/* --- Social Links --- */}
        <SocialLinks links={profile.socialLinks} isOwner={isOwner} onSave={handleSave} />

        {/* --- Key Stats & Joined Date --- */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex gap-4">
            {/* These would be fetched dynamically */}
            <span>
              <span className="font-bold text-primary">12</span> Posts
            </span>
            <span>
              <span className="font-bold text-primary">45</span> Comments
            </span>
          </div>
          <div>
            <span>Joined {joinedDate}</span>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileDetails;