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
      // Use the service layer to handle the API call
      const updatedDoc = await profileService.updateProfile(profileId, profileData);
      return updatedDoc;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to update profile");
    }
  }
);

// Update profile image (avatar or cover)
export const updateProfileImage = createAsyncThunk(
  "profile/updateProfileImage",
  async ({ profile, fieldName, file }, { rejectWithValue }) => {
    try {
      // 1. Upload the new file
      const newFile = await profileService.uploadFile(file);

      // 2. Update the profile document with the new file ID
      const updates = { [fieldName]: newFile.$id };
      const updatedProfile = await profileService.updateProfile(profile.$id, updates);

      // 3. Delete the old file (if it exists)
      const oldFileId = profile[fieldName];
      if (oldFileId) {
        await profileService.deleteFile(oldFileId);
      }

      return updatedProfile;
    } catch (err) {
      // If something fails, try to clean up the newly uploaded file
      if (newFile?.$id) await profileService.deleteFile(newFile.$id);
      return rejectWithValue(err?.message || "Failed to update image");
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
        // Merge the updated data into the existing profile state
        if (state.profile?.$id === action.payload.$id) {
          state.profile = { ...state.profile, ...action.payload };
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      })

      // updateProfileImage
      .addCase(updateProfileImage.pending, (state) => {
        state.status.update = "loading";
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        if (state.profile?.$id === action.payload.$id) {
          state.profile = action.payload;
        }
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.status.update = "failed";
        state.error = action.payload;
      });

      // Optimistic update for profile page after editing
      // The logic from the matcher is now inside the `updateProfile.fulfilled` case
      // for better clarity and to avoid running it twice.
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
