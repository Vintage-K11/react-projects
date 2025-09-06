// Database (posts,comments,likes)
// src/services/dbService.js
import conf from '../conf/conf.js';
import { Client, Databases, ID, Query } from "appwrite";

class DbService {
    client;
    databases;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        console.log("✅ DbService initialized");
    }

    // POSTS
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error("❌ createPost error:", error);
            return null;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.error("❌ updatePost error:", error);
            return null;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("❌ deletePost error:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            return result.documents;
        } catch (error) {
            return [];
        }
    }

    // COMMENTS (optional example)
    async createComment({ postId, content, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                ID.unique(),
                { postId, content, userId }
            );
        } catch (error) {
            console.error("❌ createComment error:", error);
            return null;
        }
    }
}

const dbService = new DbService();
export default dbService;
