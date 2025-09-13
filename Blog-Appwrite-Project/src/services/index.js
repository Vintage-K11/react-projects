// //  Export all appwrite services

// // src/services/index.js
// import authService from './authService';
// import dbService from './dbService';
// import storageService from './storageService';

// export { authService, dbService, storageService };


// src/services/index.js
// Export all Appwrite services for easier imports

import authService from "./authService";
import dbService from "./dbService";
import storageService from "./storageService";
import postService from "./postService";
import commentService from "./commentService";
import profileService from "./profileService";

export {
  authService,
  dbService,
  storageService,
  postService,
  commentService,
  profileService,
};
