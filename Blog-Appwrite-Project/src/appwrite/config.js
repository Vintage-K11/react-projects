import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID, Permission, Role } from "appwrite";


export class Service { 

    client = new Client();
    databases;
    bucket;
   
    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                ID.unique(),// Using a unique ID
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )        

        } catch (error) {
            console.log("Error creating post:", error);
        }

    }

    async updatePost(postId, { title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                postId,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );

        } catch (error) {
            console.log("Error updating post:", error);
        }
    }

    async deletePost(postId) {
        try {
             await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                postId
            );
            return true;
        } catch (error) {
            console.log("Error deleting post:", error);
            return false;
        }
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                postId
                
            );
        } catch (error) {
            console.log("Error getting posts:", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
                //[ Query.equal("status", "active") ]
            );
        } catch (error) {
            console.log("Error getting posts:", error);
            return false;
        }
    }

    // File Upload Services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file,
                [Permission.read(Role.any())]
            )
        } catch (error) {
            console.log("Error uploading file:", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true

        } catch (error) {
            console.log("Error deleting file:", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}


const service = new Service();
export default service;
