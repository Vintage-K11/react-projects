// // Database (posts,comments,likes)
// // src/services/dbService.js
// import conf from '../conf/conf.js';
// import { Client, Databases, ID, Query } from "appwrite";

// class DbService {
//     client;
//     databases;

//     constructor() {
//         this.client = new Client()
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);

//         this.databases = new Databases(this.client);
//         console.log("✅ DbService initialized");
//     }

//     // POSTS
//     async createPost({ title, slug, content, featuredImage, status, userId }) {
//         try {
//             return await this.databases.createDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 { title, content, featuredImage, status, userId }
//             );
//         } catch (error) {
//             console.error("❌ createPost error:", error);
//             return null;
//         }
//     }

//     async updatePost(slug, { title, content, featuredImage, status }) {
//         try {
//             return await this.databases.updateDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 { title, content, featuredImage, status }
//             );
//         } catch (error) {
//             console.error("❌ updatePost error:", error);
//             return null;
//         }
//     }

//     async deletePost(slug) {
//         try {
//             await this.databases.deleteDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//             );
//             return true;
//         } catch (error) {
//             console.error("❌ deletePost error:", error);
//             return false;
//         }
//     }

//     async getPost(slug) {
//         try {
//             return await this.databases.getDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//             );
//         } catch (error) {
//             return null;
//         }
//     }

//     async getPosts(queries = [Query.equal("status", "active")]) {
//         try {
//             const result = await this.databases.listDocuments(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 queries
//             );
//             return result.documents;
//         } catch (error) {
//             return [];
//         }
//     }

//     // COMMENTS (optional example)
//     async createComment({ postId, content, userId }) {
//         try {
//             return await this.databases.createDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCommentsCollectionId,
//                 ID.unique(),
//                 { postId, content, userId }
//             );
//         } catch (error) {
//             console.error("❌ createComment error:", error);
//             return null;
//         }
//     }
// }

// const dbService = new DbService();
// export default dbService;


// src/services/dbService.js
import conf from "@/conf";
import { Client, Databases, ID, Query } from "appwrite";

class DbService {
  client;
  databases;
  databaseId;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.databaseId = conf.appwriteDatabaseId;

    console.log("✅ DbService initialized");
  }

  /**
   * Create a new document
   * @param {string} collectionId - Appwrite collection ID
   * @param {Object} data - Document data
   * @param {string|null} documentId - Optional ID (default: unique)
   */
  async createDocument(collectionId, data, documentId = ID.unique()) {
    try {
      return await this.databases.createDocument(
        this.databaseId,
        collectionId,
        documentId,
        data
      );
    } catch (error) {
      console.error("❌ createDocument error:", error.message);
      throw error;
    }
  }

  /**
   * Update a document
   * @param {string} collectionId - Appwrite collection ID
   * @param {string} documentId - Document ID
   * @param {Object} data - Fields to update
   */
  async updateDocument(collectionId, documentId, data) {
    try {
      return await this.databases.updateDocument(
        this.databaseId,
        collectionId,
        documentId,
        data
      );
    } catch (error) {
      console.error("❌ updateDocument error:", error.message);
      throw error;
    }
  }

  /**
   * Delete a document
   * @param {string} collectionId - Appwrite collection ID
   * @param {string} documentId - Document ID
   */
  async deleteDocument(collectionId, documentId) {
    try {
      await this.databases.deleteDocument(
        this.databaseId,
        collectionId,
        documentId
      );
      return true;
    } catch (error) {
      console.error("❌ deleteDocument error:", error.message);
      throw error;
    }
  }

  /**
   * Get a single document
   * @param {string} collectionId - Appwrite collection ID
   * @param {string} documentId - Document ID
   */
  async getDocument(collectionId, documentId) {
    try {
      return await this.databases.getDocument(
        this.databaseId,
        collectionId,
        documentId
      );
    } catch (error) {
      console.error("❌ getDocument error:", error.message);
      return null;
    }
  }

  /**
   * List documents with optional queries
   * @param {string} collectionId - Appwrite collection ID
   * @param {Array} queries - Optional query filters
   */
  async listDocuments(collectionId, queries = []) {
    try {
      const result = await this.databases.listDocuments(
        this.databaseId,
        collectionId,
        queries
      );
      return result.documents;
    } catch (error) {
      console.error("❌ listDocuments error:", error.message);
      return [];
    }
  }
}

const dbService = new DbService();
export default dbService;
