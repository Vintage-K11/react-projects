// src/services/commentService.js
import conf from "@/conf";
import { Client, Databases, ID, Query } from "appwrite";

class CommentService {
  client;
  databases;
  databaseId;
  collectionId;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.databaseId = conf.appwriteDatabaseId;
    this.collectionId = conf.appwriteCommentsCollectionId;

    console.log("✅ CommentService initialized");
  }

  // Create a new comment
  async createComment({ postId, userId, content }) {
    try {
      const newComment = await this.databases.createDocument(
        this.databaseId,
        this.collectionId,
        ID.unique(),
        {
          postId,
          userId,
          content,
          createdAt: new Date().toISOString(),
        }
      );
      return newComment;
    } catch (error) {
      console.error("❌ createComment error:", error.message);
      throw error;
    }
  }

  // Get all comments for a specific post
  async getCommentsByPost(postId) {
    try {
      const comments = await this.databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal("postId", postId), Query.orderDesc("$createdAt")]
      );
      return comments.documents;
    } catch (error) {
      console.error("❌ getCommentsByPost error:", error.message);
      throw error;
    }
  }

  // Get all comments by a specific user
  async getCommentsByUser(userId) {
    try {
      const comments = await this.databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
      );
      return comments.documents;
    } catch (error) {
      console.error("❌ getCommentsByUser error:", error.message);
      throw error;
    }
  }

  // Update a comment
  async updateComment(commentId, { content }) {
    try {
      const updated = await this.databases.updateDocument(
        this.databaseId,
        this.collectionId,
        commentId,
        { content }
      );
      return updated;
    } catch (error) {
      console.error("❌ updateComment error:", error.message);
      throw error;
    }
  }

  // Delete a comment
  async deleteComment(commentId) {
    try {
      await this.databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        commentId
      );
      return true;
    } catch (error) {
      console.error("❌ deleteComment error:", error.message);
      throw error;
    }
  }
}

const commentService = new CommentService();
export default commentService;
