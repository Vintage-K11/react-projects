// // src/store/postSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import postService from "../services/postService";

// // Async thunk to fetch all posts
// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
//   try {
//     return await postService.getPosts();
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Async thunk to create a new post
// export const createPost = createAsyncThunk("posts/createPost", async (postData, { rejectWithValue }) => {
//   try {
//     return await postService.createPost(postData);
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Async thunk to update a post
// export const updatePost = createAsyncThunk("posts/updatePost", async ({ postId, postData }, { rejectWithValue }) => {
//   try {
//     return await postService.updatePost(postId, postData);
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Async thunk to delete a post
// export const deletePost = createAsyncThunk("posts/deletePost", async (postId, { rejectWithValue }) => {
//   try {
//     const success = await postService.deletePost(postId);
//     if (!success) throw new Error("Delete failed");
//     return postId;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// const initialState = {
//   posts: [],
//   status: "idle", // idle | loading | succeeded | failed
//   error: null,
// };

// const postSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // fetchPosts
//       .addCase(fetchPosts.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.posts = action.payload;
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // createPost
//       .addCase(createPost.fulfilled, (state, action) => {
//         state.posts.push(action.payload);
//       })
//       // updatePost
//       .addCase(updatePost.fulfilled, (state, action) => {
//         state.posts = state.posts.map((post) =>
//           post.$id === action.payload.$id ? action.payload : post
//         );
//       })
//       // deletePost
//       .addCase(deletePost.fulfilled, (state, action) => {
//         state.posts = state.posts.filter((post) => post.$id !== action.payload);
//       });
//   },
// });

// // ✅ Selectors
// export const selectAllPosts = (state) => state.posts.posts;
// export const selectPostById = (state, id) =>
//   state.posts.posts.find((post) => post.$id === id);
// export const selectPostsStatus = (state) => state.posts.status;
// export const selectPostsError = (state) => state.posts.error;

// export default postSlice.reducer;
