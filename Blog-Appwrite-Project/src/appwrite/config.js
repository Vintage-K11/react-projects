import conf from "../conf/conf";
import { Client, Databases,Storage,Query, ID } from "appwrite";


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
                slug,// Using slug as the document ID
                {
                    title,
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

    async updatePost(slug, { title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, // Using slug as the document ID
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

    async deletePost(slug) {
        try {
             await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug // Using slug as the document ID
            );
            return true;
        } catch (error) {
            console.log("Error deleting post:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
                
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
                file
            );
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
            return true;
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