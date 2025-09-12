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
import authService from "@/services/authService";

// Async thunk: Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await authService.login({ email, password });
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Signup user
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await authService.createAccount({ name, email, password });
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk: Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await authService.logout();
  return null;
});

// Async thunk: Fetch current user (restore session)
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: null,
  status: "idle", // idle | loading | authenticated | error
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // signup
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.userData = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.userData = null;
        state.error = null;
      })

      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = action.payload ? "authenticated" : "idle";
        state.userData = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = "idle";
        state.userData = null;
      });
  },
});

// ✅ Selectors
export const selectCurrentUser = (state) => state.auth.userData;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
