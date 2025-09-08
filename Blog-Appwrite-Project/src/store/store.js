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
import { configureStore } from '@reduxjs/toolkit';

// Dummy reducers just to satisfy imports
const dummyReducer = (state = {}, action) => state;

const store = configureStore({
  reducer: {
    auth: dummyReducer,
    post: dummyReducer,
    comment: dummyReducer,
    profile: dummyReducer,
  },
});

export default store;
