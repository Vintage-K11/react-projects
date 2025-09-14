// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService, profileService } from "@/services";

// ==========================
// Initial State
// ==========================
const initialState = {
  user: null,
  profile: null,
  authStatus: "idle", // idle | loading | authenticated | unauthenticated
  operationStatus: "idle",
  error: null,
};

// ==========================
// Async Thunks
// ==========================

// Signup + create profile
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password, username }, { rejectWithValue }) => {
    try {
      // 1️⃣ Create Appwrite account
      const user = await authService.createAccount({ name, email, password });

      // 2️⃣ Default avatar & cover
      const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || email)}`;
      const defaultCover = "https://source.unsplash.com/1200x400/?nature,abstract";

      // 3️⃣ Profile data
      const profileData = {
        userId: user.$id,
        username,
        name: name || "New User",
        bio: "Hey 👋 I’m new here!",
        avatarUrl: defaultAvatar,
        coverImageUrl: defaultCover,
        location: "",
        followers: [],
        following: [],
      };

      // 4️⃣ Create profile
      const profile = await profileService.createProfile(profileData);

      return { user, profile };
    } catch (error) {
      console.error("❌ signupUser error:", error);
      return rejectWithValue(error?.message || "Signup failed");
    }
  }
);

// Login + fetch profile
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await authService.login({ email, password });
      const profile = await profileService.getProfileByUserId(user.$id);
      return { user, profile };
    } catch (error) {
      console.error("❌ loginUser error:", error);
      return rejectWithValue(error?.message || "Login failed");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch (error) {
      console.error("❌ logoutUser error:", error);
      return rejectWithValue(error?.message || "Logout failed");
    }
  }
);

// Restore session
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) return null;
      const profile = await profileService.getProfileByUserId(user.$id);
      return { user, profile };
    } catch (error) {
      console.error("❌ fetchCurrentUser error:", error);
      return rejectWithValue(error?.message || "Failed to restore session");
    }
  }
);

// ==========================
// Slice
// ==========================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.profile = null;
      state.authStatus = "idle";
      state.operationStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.operationStatus = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.authStatus = "authenticated";
        state.operationStatus = "succeeded";
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.authStatus = "unauthenticated";
        state.operationStatus = "failed";
        state.user = null;
        state.profile = null;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.operationStatus = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authStatus = "authenticated";
        state.operationStatus = "succeeded";
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authStatus = "unauthenticated";
        state.operationStatus = "failed";
        state.user = null;
        state.profile = null;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.operationStatus = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authStatus = "unauthenticated";
        state.operationStatus = "succeeded";
        state.user = null;
        state.profile = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.operationStatus = "failed";
        state.error = action.payload;
      })

      // Restore session
      .addCase(fetchCurrentUser.pending, (state) => {
        state.operationStatus = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.authStatus = "authenticated";
          state.user = action.payload.user;
          state.profile = action.payload.profile;
        } else {
          state.authStatus = "unauthenticated";
          state.user = null;
          state.profile = null;
        }
        state.operationStatus = "succeeded";
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.authStatus = "unauthenticated";
        state.operationStatus = "failed";
        state.user = null;
        state.profile = null;
        state.error = action.payload;
      });
  },
});

// ==========================
// Selectors
// ==========================
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentProfile = (state) => state.auth.profile;
export const selectAuthStatus = (state) => state.auth.authStatus;
export const selectAuthOperationStatus = (state) => state.auth.operationStatus;
export const selectAuthError = (state) => state.auth.error;

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
