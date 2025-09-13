// src/store/postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "@/services";

// Initial state
const initialState = {
  posts: [],
  singlePost: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// Async Thunks

// Fetch all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const posts = await postService.getPosts();
      return posts;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch posts");
    }
  }
);

// Fetch single post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const post = await postService.getPost(postId);
      return post;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch post");
    }
  }
);

// Create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const post = await postService.createPost(postData);
      return post;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to create post");
    }
  }
);

// Update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const updatedPost = await postService.updatePost(postId, postData);
      return updatedPost;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to update post");
    }
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const success = await postService.deletePost(postId);
      if (!success) throw new Error("Delete failed");
      return postId;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to delete post");
    }
  }
);

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearSinglePost: (state) => {
      state.singlePost = null;
    },
    clearPostsState: (state) => {
      state.posts = [];
      state.singlePost = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // fetchPostById
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singlePost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // createPost
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      // updatePost
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.$id === action.payload.$id ? action.payload : post
        );
      })

      // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.$id !== action.payload);
      });
  },
});

// Selectors
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostByIdState = (state) => state.posts.singlePost;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export const { clearSinglePost, clearPostsState } = postSlice.actions;

export default postSlice.reducer;
