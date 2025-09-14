// src/conf.js

const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL || "",
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "",
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || "",
  appwriteBlogpostCollectionId: import.meta.env.VITE_APPWRITE_BLOGPOST_COLLECTION_ID || "",
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID || "",
  appwriteProfilesCollectionId: import.meta.env.VITE_APPWRITE_PROFILES_COLLECTION_ID || "",
};

// ✅ Validate essential environment variables
Object.entries(conf).forEach(([key, value]) => {
  if (!value) {
    console.warn(`⚠️ Environment variable for ${key} is missing or empty`);
  }
});

export default conf;
