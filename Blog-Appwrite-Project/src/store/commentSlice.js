// src/store/commentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentService } from "@/services";

// Initial state
const initialState = {
  comments: [],
  status: "idle", // idle | loading | success | error
  error: null,
};

// Async Thunks

// Fetch comments for a specific post
export const fetchCommentsByPost = createAsyncThunk(
  "comments/fetchByPost",
  async (postId, { rejectWithValue }) => {
    try {
      const comments = await commentService.getCommentsByPost(postId);
      return comments;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch comments");
    }
  }
);

// Create a new comment
export const createComment = createAsyncThunk(
  "comments/create",
  async ({ postId, userId, content }, { rejectWithValue }) => {
    try {
      const comment = await commentService.createComment({ postId, userId, content });
      return comment;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to create comment");
    }
  }
);

// Update a comment
export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const updatedComment = await commentService.updateComment(commentId, { content });
      return updatedComment;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to update comment");
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (commentId, { rejectWithValue }) => {
    try {
      await commentService.deleteComment(commentId);
      return commentId;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to delete comment");
    }
  }
);

// Slice
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCommentsByPost
      .addCase(fetchCommentsByPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.status = "success";
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // createComment
      .addCase(createComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "success";
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // updateComment
      .addCase(updateComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.comments.findIndex(c => c.$id === action.payload.$id);
        if (index !== -1) state.comments[index] = action.payload;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // deleteComment
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "success";
        state.comments = state.comments.filter(c => c.$id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectComments = (state) => state.comments.comments;
export const selectCommentsStatus = (state) => state.comments.status;
export const selectCommentsError = (state) => state.comments.error;

export const { clearComments } = commentSlice.actions;

export default commentSlice.reducer;
