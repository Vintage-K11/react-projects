// // src/store/store.js
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import postReducer from "./postSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     posts: postReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// export default store;

// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import commentReducer from "./commentSlice";
import profileReducer from "./profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comments: commentReducer,  // note: renamed to 'comments' for clarity
    profile: profileReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // enable Redux DevTools only in dev
});

export default store;
