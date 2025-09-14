// src/components/index.js

// Layout Components
import Header from './layout/Header';
import Footer from './layout/Footer';
import HeaderLite from './layout/layoutcomponents/HeaderLite';
import FooterLite from './layout/layoutcomponents/FooterLite';
import Sidebar from './layout/layoutcomponents/Sidebar';
import Container from './layout/layoutcomponents/Container';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';
import MainLayout from './layout/MainLayout';

// Common Components
import Button from './common/Button';
import Card from './common/Card';
import Input from './common/Input';
import Label from './common/Label';
import Select from './common/Select';
import RTE from './common/RTE';
import Textarea from './common/Textarea';
import Logo from './common/Logo';
import SocialSidebar from './common/SocialSidebar';
import UserAvatar from './common/UserAvatar';
import ToastAlert from './common/ToastAlert';

// Blog Components
import PostEditor from './blog/PostEditor';
import PostCard from './blog/PostCard';
import PostList from './blog/PostList';
import PostMeta from './blog/PostMeta';
import PostDetails from './blog/PostDetails';
import CreatePostForm from './blog/CreatePostForm';
import EditPostForm from './blog/EditPostForm';

// Profile Components
import EditProfileForm from './profile/EditProfileForm';
import ProfileHeader from './profile/ProfileHeader';
import ProfileInfo from './profile/ProfileInfo';
import ProfilePosts from './profile/ProfilePosts';
import ProfileStats from './profile/ProfileStats';

// Comment Components
import CommentCard from './comment/CommentCard';
import CommentForm from './comment/CommentForm';
import CommentList from './comment/CommentList';

// Skeleton Components
import CommentSkeleton from './common/skeletons/CommentSkeleton';
import PostCardSkeleton from './common/skeletons/PostCardSkeleton';
import ProfileSkeleton from './common/skeletons/ProfileSkeleton';

// Exporting for easy imports
export {
  // Layout
  Header,
  Footer,
  HeaderLite,
  FooterLite,
  Sidebar,
  Container,
  AuthLayout,
  DashboardLayout,
  MainLayout,

  // Common
  Button,
  Card,
  Input,
  Label,
  Select,
  RTE,
  Textarea,
  Logo,
  SocialSidebar,
  UserAvatar,
  ToastAlert,

  // Blog
  PostEditor,
  PostCard,
  PostList,
  PostMeta,
  PostDetails,
  CreatePostForm,
  EditPostForm,

  // Profile
  EditProfileForm,
  ProfileHeader,
  ProfileInfo,
  ProfilePosts,
  ProfileStats,

  // Comment
  CommentCard,
  CommentForm,
  CommentList,

  // Skeletons
  CommentSkeleton,
  PostCardSkeleton,
  ProfileSkeleton,
};
