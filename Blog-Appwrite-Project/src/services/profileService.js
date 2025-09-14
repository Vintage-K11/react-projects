// src/services/profileService.js
import conf from "@/conf";
import { Client, Databases, ID, Query, Permission, Role } from "appwrite";

class ProfileService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
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
      const finalCover =
        coverImageUrl || "https://source.unsplash.com/1600x400/?nature,abstract"; // valid default cover

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
