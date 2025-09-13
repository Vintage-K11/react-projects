// src/store/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "@/services/profileService";

// Initial state
const initialState = {
  profile: null,
  fetchStatus: "idle",   // idle | loading | succeeded | failed
  updateStatus: "idle",
  createStatus: "idle",
  error: null,
};

// ==========================
// Async Thunks
// ==========================

// Fetch user profile by userId
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const profile = await profileService.getProfileByUserId(userId);
      if (!profile) throw new Error("Profile not found");
      return profile;
    } catch (error) {
      console.error("❌ fetchProfile error:", error);
      return rejectWithValue(error?.message || "Failed to fetch profile");
    }
  }
);

// Create profile (admin or fallback)
export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async ({ userId, name, bio, avatarUrl, location, website, socialLinks }, { rejectWithValue }) => {
    try {
      const newProfile = await profileService.createProfile({
        userId,
        name,
        bio,
        avatarUrl,
        location,
        website,
        socialLinks,
      });
      return newProfile;
    } catch (error) {
      console.error("❌ createProfile error:", error);
      return rejectWithValue(error?.message || "Failed to create profile");
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ profileId, profileData }, { rejectWithValue }) => {
    try {
      const updatedProfile = await profileService.updateProfile(profileId, profileData);
      return updatedProfile;
    } catch (error) {
      console.error("❌ updateProfile error:", error);
      return rejectWithValue(error?.message || "Failed to update profile");
    }
  }
);

// ==========================
// Slice
// ==========================
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.fetchStatus = "idle";
      state.updateStatus = "idle";
      state.createStatus = "idle";
      state.error = null;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.error = null;
    },
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })

      // createProfile
      .addCase(createProfile.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      })

      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });
  },
});

// ==========================
// Selectors
// ==========================
export const selectProfile = (state) => state.profile.profile;
export const selectProfileFetchStatus = (state) => state.profile.fetchStatus;
export const selectProfileUpdateStatus = (state) => state.profile.updateStatus;
export const selectProfileCreateStatus = (state) => state.profile.createStatus;
export const selectProfileError = (state) => state.profile.error;

export const { clearProfile, resetUpdateStatus, resetCreateStatus } = profileSlice.actions;

export default profileSlice.reducer;
