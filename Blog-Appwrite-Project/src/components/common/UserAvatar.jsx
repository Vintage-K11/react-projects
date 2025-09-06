import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function UserAvatar({ src, alt, name, className }) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt || name} />
      <AvatarFallback>{name ? name[0].toUpperCase() : "?"}</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
