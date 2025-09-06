//  Storage (upload, delete, preview files)
// src/services/storageService.js
import conf from '../conf/conf.js';
import { Client, Storage, ID } from "appwrite";

class StorageService {
    client;
    storage;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.storage = new Storage(this.client);
        console.log("✅ StorageService initialized");
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.error("❌ uploadFile error:", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            if (!fileId) return false;
            await this.storage.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("❌ deleteFile error:", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) return "";
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const storageService = new StorageService();
export default storageService;
