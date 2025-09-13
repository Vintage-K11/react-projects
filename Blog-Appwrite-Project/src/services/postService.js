// // src/services/postService.js
// // Dummy postService to resolve import error
// // Replace with actual implementation as needed

// const postService = {
//   getPosts: async () => [],
//   createPost: async (postData) => postData,
//   updatePost: async (postId, postData) => ({ ...postData, $id: postId }),
//   deletePost: async (postId) => true,
// };

// export default postService;

// src/services/postService.js
import { db, storage } from "./appwriteClient";
import conf from "../conf";
import { ID, Query } from "appwrite";

/**
 * Posts collection should have at least these attributes:
 * - title (string)
 * - slug (string, unique identifier for SEO-friendly URLs)
 * - content (rich text / markdown)
 * - excerpt (short description)
 * - authorId (string: user $id)
 * - tags (array)
 * - coverFileId (string, optional: uploaded file id from storage)
 * - createdAt (datetime)
 * - updatedAt (datetime)
 */

const databaseId = conf.appwriteDatabaseId;
const collectionId = conf.appwriteCollectionId;
const bucketId = conf.appwriteBucketId;

const postService = {
  /**
   * Get paginated posts
   * @param {Object} options { page, limit, queries }
   */
  async getPosts({ page = 1, limit = 10, queries = [] } = {}) {
    try {
      const offset = (page - 1) * limit;
      const response = await db.listDocuments(
        databaseId,
        collectionId,
        [
          ...queries,
          Query.orderDesc("createdAt"),
          Query.limit(limit),
          Query.offset(offset),
        ]
      );
      return {
        total: response.total,
        posts: response.documents,
      };
    } catch (err) {
      console.error("Error fetching posts:", err);
      throw err;
    }
  },

  /**
   * Get single post by ID
   */
  async getPostById(postId) {
    try {
      return await db.getDocument(databaseId, collectionId, postId);
    } catch (err) {
      console.error("Error fetching post:", err);
      throw err;
    }
  },

  /**
   * Create a post with optional cover image
   */
  async createPost({ data, file = null }) {
    try {
      let fileId = null;

      if (file) {
        const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);
        fileId = uploadedFile.$id;
      }

      const payload = {
        ...data,
        coverFileId: fileId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return await db.createDocument(databaseId, collectionId, ID.unique(), payload);
    } catch (err) {
      console.error("Error creating post:", err);
      throw err;
    }
  },

  /**
   * Update an existing post
   */
  async updatePost(postId, { data, file = null }) {
    try {
      if (file) {
        const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);
        data.coverFileId = uploadedFile.$id;
      }

      const payload = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      return await db.updateDocument(databaseId, collectionId, postId, payload);
    } catch (err) {
      console.error("Error updating post:", err);
      throw err;
    }
  },

  /**
   * Delete a post
   */
  async deletePost(postId) {
    try {
      return await db.deleteDocument(databaseId, collectionId, postId);
    } catch (err) {
      console.error("Error deleting post:", err);
      throw err;
    }
  },

  /**
   * Get a file preview URL
   */
  getFilePreview(fileId) {
    try {
      return storage.getFilePreview(bucketId, fileId);
    } catch (err) {
      console.error("Error getting file preview:", err);
      throw err;
    }
  },

  /**
   * Get a direct file view (useful for images/PDFs)
   */
  getFileView(fileId) {
    try {
      return storage.getFileView(bucketId, fileId);
    } catch (err) {
      console.error("Error getting file view:", err);
      throw err;
    }
  },
};

export default postService;
