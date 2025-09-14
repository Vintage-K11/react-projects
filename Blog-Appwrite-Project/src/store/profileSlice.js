// src/store/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "@/services/profileService";

// ==========================
// Initial State
// ==========================
const initialState = {
  profile: null,
  status: {
    fetchById: "idle",        // idle | loading | succeeded | failed
    fetchByUsername: "idle",
    create: "idle",
    update: "idle",
  },
  error: null,
};

// ==========================
// Async Thunks
// ==========================

// Fetch profile by userId (private)
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const profile = await profileService.getProfileByUserId(userId);
      if (!profile) throw new Error("Profile not found");
      return profile;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to fetch profile");
    }
  }
);

// Fetch profile by username (public)
export const fetchProfileByUsername = createAsyncThunk(
  "profile/fetchProfileByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const profile = await profileService.getProfileByUsername(username);
      if (!profile) throw new Error("Profile not found");
      return profile;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to fetch profile by username");
    }
  }
);

// Create new profile
export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      return await profileService.createProfile(profileData);
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to create profile");
    }
  }
);

// Update profile (owner only)
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ profileId, profileData }, { rejectWithValue }) => {
    try {
      return await profileService.updateProfile(profileId, profileData);
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to update profile");
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
      state.error = null;
      Object.keys(state.status).forEach((key) => (state.status[key] = "idle"));
    },
    resetStatus: (state, action) => {
      const key = action.payload;
      if (state.status[key]) state.status[key] = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.status.fetchById = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status.fetchById = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status.fetchById = "failed";
        state.error = action.payload;
      })

      // fetchProfileByUsername
      .addCase(fetchProfileByUsername.pending, (state) => {
        state.status.fetchByUsername = "loading";
        state.error = null;
      })
      .addCase(fetchProfileByUsername.fulfilled, (state, action) => {
        state.status.fetchByUsername = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfileByUsername.rejected, (state, action) => {
        state.status.fetchByUsername = "failed";
        state.error = action.payload;
      })

      // createProfile
      .addCase(createProfile.pending, (state) => {
        state.status.create = "loading";
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.status.create = "failed";
        state.error = action.payload;
      })

      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.status.update = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      });
  },
});

// ==========================
// Selectors
// ==========================
export const selectProfile = (state) => state.profile.profile;
export const selectProfileStatus = (state) => state.profile.status;
export const selectProfileFetchStatus = (state) => state.profile.status.fetchByUsername;
export const selectProfileUpdateStatus = (state) => state.profile.status.update;
export const selectProfileError = (state) => state.profile.error;

export const { clearProfile, resetStatus } = profileSlice.actions;
export default profileSlice.reducer;
