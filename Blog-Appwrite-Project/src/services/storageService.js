// //  Storage (upload, delete, preview files)
// // src/services/storageService.js
// import conf from '../conf/conf.js';
// import { Client, Storage, ID } from "appwrite";

// class StorageService {
//     client;
//     storage;

//     constructor() {
//         this.client = new Client()
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);

//         this.storage = new Storage(this.client);
//         console.log("✅ StorageService initialized");
//     }

//     async uploadFile(file) {
//         try {
//             return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
//         } catch (error) {
//             console.error("❌ uploadFile error:", error);
//             return null;
//         }
//     }

//     async deleteFile(fileId) {
//         try {
//             if (!fileId) return false;
//             await this.storage.deleteFile(conf.appwriteBucketId, fileId);
//             return true;
//         } catch (error) {
//             console.error("❌ deleteFile error:", error);
//             return false;
//         }
//     }

//     getFilePreview(fileId) {
//         if (!fileId) return "";
//         return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
//     }
// }

// const storageService = new StorageService();
// export default storageService;

// src/services/storageService.js
import conf from "@/conf";
import { Client, Storage, ID } from "appwrite";

class StorageService {
  client;
  storage;
  bucketId;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
    this.bucketId = conf.appwriteBucketId;

    console.log("✅ StorageService initialized");
  }

  /**
   * Upload a file to Appwrite storage
   * @param {File|Blob} file - File to upload
   * @returns {Object|null} Uploaded file object or null
   */
  async uploadFile(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        this.bucketId,
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      console.error("❌ uploadFile error:", error.message);
      throw error;
    }
  }

  /**
   * Delete a file from storage
   * @param {string} fileId - File ID
   * @returns {boolean} true if deleted
   */
  async deleteFile(fileId) {
    try {
      if (!fileId) return false;
      await this.storage.deleteFile(this.bucketId, fileId);
      return true;
    } catch (error) {
      console.error("❌ deleteFile error:", error.message);
      throw error;
    }
  }

  /**
   * Get a file preview (thumbnail image)
   * @param {string} fileId - File ID
   * @returns {string} Preview URL
   */
  getFilePreview(fileId) {
    try {
      if (!fileId) return "";
      return this.storage.getFilePreview(this.bucketId, fileId).href;
    } catch (error) {
      console.error("❌ getFilePreview error:", error.message);
      return "";
    }
  }

  /**
   * Get direct file view/download URL
   * @param {string} fileId - File ID
   * @returns {string} File URL
   */
  getFileView(fileId) {
    try {
      if (!fileId) return "";
      return this.storage.getFileView(this.bucketId, fileId).href;
    } catch (error) {
      console.error("❌ getFileView error:", error.message);
      return "";
    }
  }
}

const storageService = new StorageService();
export default storageService;
