// src/services/profileService.js
import conf from "@/conf";
import { Client, Databases, ID, Query, Permission, Role } from "appwrite";

/**
 * ProfileService handles CRUD operations for user profiles
 * using Appwrite's Databases API.
 */
class ProfileService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.databaseId = conf.appwriteDatabaseId;
    this.collectionId = conf.appwriteProfilesCollectionId;

    console.log("✅ ProfileService initialized");
  }

  /**
   * Create a new profile with safe defaults
   * @param {Object} profileData
   * @param {string} profileData.userId - Appwrite user ID
   * @param {string} profileData.name - Display name
   * @param {string} [profileData.bio]
   * @param {string} [profileData.avatarUrl]
   * @param {string} [profileData.location]
   * @param {string} [profileData.website]
   * @param {Object} [profileData.socialLinks]
   * @returns {Promise<Object>} created document
   */
  async createProfile({
    userId,
    name = "New User",
    bio = "Hey 👋 I’m new here!",
    avatarUrl = "",
    location = "",
    website = "",
    socialLinks = {},
  }) {
    try {
      // fallback avatar (initials if name, else generic)
      const defaultAvatar = name
        ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
            name
          )}`
        : "https://www.gravatar.com/avatar/?d=mp";

      const doc = await this.databases.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        {
          userId,
          name,
          bio,
          avatarUrl: avatarUrl || defaultAvatar,
          location,
          website,
          socialLinks,
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );

      return doc;
    } catch (error) {
      console.error("❌ ProfileService.createProfile error:", error.message);
      throw error;
    }
  }

  // Get profile by userId
  async getProfileByUserId(userId) {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal("userId", userId)]
      );
      return result.documents.length > 0 ? result.documents[0] : null;
    } catch (error) {
      console.error(
        "❌ ProfileService.getProfileByUserId error:",
        error.message
      );
      throw error;
    }
  }

  // Update profile by document ID
  async updateProfile(profileId, updates) {
    try {
      return await this.databases.updateDocument(
        this.databaseId,
        this.collectionId,
        profileId,
        updates
      );
    } catch (error) {
      console.error("❌ ProfileService.updateProfile error:", error.message);
      throw error;
    }
  }

  // Delete a profile
  async deleteProfile(profileId) {
    try {
      await this.databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        profileId
      );
      return true;
    } catch (error) {
      console.error("❌ ProfileService.deleteProfile error:", error.message);
      throw error;
    }
  }

  // List profiles (admin usage only)
  async listProfiles(limit = 50) {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.limit(limit)]
      );
      return result.documents;
    } catch (error) {
      console.error("❌ ProfileService.listProfiles error:", error.message);
      return [];
    }
  }
}

const profileService = new ProfileService();
export default profileService;
