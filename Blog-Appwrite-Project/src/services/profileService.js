// src/services/profileService.js
import conf from '@/conf';
import { Client, Databases, ID, Query, Permission, Role, Storage } from 'appwrite';

class ProfileService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.databaseId = conf.appwriteDatabaseId;
    this.collectionId = conf.appwriteProfilesCollectionId;

    if (!this.databaseId || !this.collectionId) {
      console.warn("⚠️ ProfileService: Missing Database or Collection ID in conf.");
    } else {
      console.log("✅ ProfileService ready for:", this.collectionId);
    }
  }

  // ==========================
  // Create new profile
  // ==========================
  async createProfile({
    userId,
    username,
    name = "New User",
    bio = "Hey 👋 I’m new here!",
    avatarUrl = "",
    coverImageUrl = "",
    location = "",
  followers = 0,
  following = 0,
  }) {
    if (!userId || !username) throw new Error("userId and username are required");

    try {
      const finalAvatar =
        avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || username)}`;
      const finalCover = coverImageUrl || null; // Use null instead of an empty string for the default

      // Check username uniqueness
      const existing = await this.getProfileByUsername(username);
      if (existing) throw new Error("Username already taken");

      return await this.databases.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        {
          userId,
          username: username.toLowerCase(),
          name,
          bio,
          avatarUrl: finalAvatar,
          coverImageUrl: finalCover,
          location,
          followers: typeof followers === "number" ? followers : 0,
          following: typeof following === "number" ? following : 0,
        },
        [
          Permission.read(Role.any()),          // Public profile
          Permission.update(Role.user(userId)), // Only owner can update
          Permission.delete(Role.user(userId)), // Only owner can delete
        ]
      );
    } catch (error) {
      console.error("❌ createProfile failed:", error.message);
      throw error;
    }
  }

  // ==========================
  // Fetch profile by userId
  // ==========================
  async getProfileByUserId(userId) {
    if (!userId) throw new Error("userId is required");
    try {
      const res = await this.databases.listDocuments(this.databaseId, this.collectionId, [
        Query.equal("userId", userId),
        Query.limit(1),
      ]);
      return res.documents[0] || null;
    } catch (error) {
      console.error("❌ getProfileByUserId failed:", error.message);
      throw error;
    }
  }

  // ==========================
  // Fetch profile by username
  // ==========================
  async getProfileByUsername(username) {
    if (!username) throw new Error("username is required");
    try {
      const res = await this.databases.listDocuments(this.databaseId, this.collectionId, [
        Query.equal("username", username.toLowerCase()),
        Query.limit(1),
      ]);
      return res.documents[0] || null;
    } catch (error) {
      console.error("❌ getProfileByUsername failed:", error.message);
      throw error;
    }
  }

  // ==========================
  // Update profile
  // ==========================
  async updateProfile(profileId, updates) {
    if (!profileId) throw new Error("profileId is required");
    try {
      if (updates.username) updates.username = updates.username.toLowerCase();
      return await this.databases.updateDocument(this.databaseId, this.collectionId, profileId, updates);
    } catch (error) {
      console.error("❌ updateProfile failed:", error.message);
      throw error;
    }
  }

  // ==========================
  // File/Image Handling
  // ==========================
  async uploadFile(file) {
    if (!conf.appwriteBucketId) throw new Error('Storage Bucket ID is not configured.');
    try {
      return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error('❌ uploadFile failed:', error.message);
      throw error;
    }
  }

  async deleteFile(fileId) {
    if (!conf.appwriteBucketId) throw new Error('Storage Bucket ID is not configured.');
    if (!fileId) return; // Don't fail if there's no file to delete
    try {
      return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      // It's possible the file doesn't exist, so we can often ignore this error.
      console.warn('⚠️ deleteFile failed:', error.message);
    }
  }

  getFilePreview(fileId, width, height) {
    if (!conf.appwriteBucketId) throw new Error('Storage Bucket ID is not configured.');
    if (!fileId) return null;
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId, width, height);
    } catch (error) {
      console.error('❌ getFilePreview failed:', error.message);
      return null;
    }
  }

  // ==========================
  // Follow / Unfollow Logic
  // ==========================
  async follow(myProfileId, theirProfileId, myCurrentFollowing, theirCurrentFollowers) {
    if (!myProfileId || !theirProfileId) throw new Error("Both profile IDs are required");
    try {
      // Add their ID to my 'following' list
      const updateMyProfile = this.databases.updateDocument(this.databaseId, this.collectionId, myProfileId, {
        following: [...(myCurrentFollowing || []), theirProfileId],
      });

      // Add my ID to their 'followers' list
      const updateTheirProfile = this.databases.updateDocument(this.databaseId, this.collectionId, theirProfileId, {
        followers: [...(theirCurrentFollowers || []), myProfileId],
      });

      await Promise.all([updateMyProfile, updateTheirProfile]);
      return true;
    } catch (error) {
      console.error("❌ follow failed:", error.message);
      throw error;
    }
  }

  async unfollow(myProfileId, theirProfileId, myCurrentFollowing, theirCurrentFollowers) {
    if (!myProfileId || !theirProfileId) throw new Error("Both profile IDs are required");
    try {
      const updateMyProfile = this.databases.updateDocument(this.databaseId, this.collectionId, myProfileId, {
        following: (myCurrentFollowing || []).filter(id => id !== theirProfileId),
      });
      const updateTheirProfile = this.databases.updateDocument(this.databaseId, this.collectionId, theirProfileId, {
        followers: (theirCurrentFollowers || []).filter(id => id !== myProfileId),
      });
      await Promise.all([updateMyProfile, updateTheirProfile]);
      return true;
    } catch (error) {
      console.error("❌ unfollow failed:", error.message);
      throw error;
    }
  }
  // ==========================
  // Delete profile
  // ==========================
  async deleteProfile(profileId) {
    if (!profileId) throw new Error("profileId is required");
    try {
      await this.databases.deleteDocument(this.databaseId, this.collectionId, profileId);
      return true;
    } catch (error) {
      console.error("❌ deleteProfile failed:", error.message);
      throw error;
    }
  }

  // ==========================
  // List public profiles (paginated)
  // ==========================
  async listProfiles({ limit = 20, offset = 0 } = {}) {
    try {
      const res = await this.databases.listDocuments(this.databaseId, this.collectionId, [
        Query.limit(limit),
        Query.offset(offset),
      ]);
      return res.documents;
    } catch (error) {
      console.error("❌ listProfiles failed:", error.message);
      return [];
    }
  }
}

const profileService = new ProfileService();
export default profileService;
