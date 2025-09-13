// // src/store/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "../services/authService";

// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       await authService.login({ email, password });
//       const user = await authService.getCurrentUser();
//       return user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for logout
// export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
//   await authService.logout();
//   return null;
// });

// const initialState = {
//   userData: null,
//   status: "idle", // idle | loading | authenticated | error
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.status = "authenticated";
//         state.userData = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = "error";
//         state.error = action.payload;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.status = "idle";
//         state.userData = null;
//         state.error = null;
//       });
//   },
// });

// // ✅ Selectors
// export const selectCurrentUser = (state) => state.auth.userData;
// export const selectAuthStatus = (state) => state.auth.status;
// export const selectAuthError = (state) => state.auth.error;

// export default authSlice.reducer;

// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService, profileService } from "@/services";

// ==========================
// Initial state
// ==========================
const initialState = {
  user: null,
  status: "idle", // idle | loading | authenticated | error
  error: null,
};

// ==========================
// Async Thunks
// ==========================

// Signup user + auto create default profile
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      // 1️⃣ Create auth account
      const user = await authService.createAccount({ name, email, password });

      // 2️⃣ Prepare default avatar (grey initials)
      const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        name || email
      )}`;

      // 3️⃣ Auto-create profile (non-blocking if fails)
      try {
        await profileService.createProfile({
          userId: user.$id,
          name: name || "New User",
          bio: "Hey 👋 I’m new here!",
          avatarUrl: defaultAvatar,
          socialLinks: {},
        });
      } catch (profileError) {
        console.error("⚠️ Auto-profile creation failed:", profileError.message);
      }

      return user;
    } catch (error) {
      return rejectWithValue(error?.message || "Signup failed");
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await authService.login({ email, password });
      return user;
    } catch (error) {
      return rejectWithValue(error?.message || "Login failed");
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch (error) {
      return rejectWithValue(error?.message || "Logout failed");
    }
  }
);

// Fetch current user (restore session)
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch user");
    }
  }
);

// ==========================
// Slice
// ==========================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.user = null;
        state.error = action.payload;
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "error";
        state.user = null;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "authenticated";
          state.user = action.payload;
        } else {
          state.status = "idle";
          state.user = null;
        }
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "idle";
        state.user = null;
        state.error = action.payload;
      });
  },
});

// ==========================
// Selectors
// ==========================
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
