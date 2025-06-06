import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authClient from "../../services/authClient";
import handleApiError from "../../helpers/handleApiError";

export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authClient.post("/create-account", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const editAccount = createAsyncThunk(
  "auth/editAccount",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await authClient.put(`/edit-account/${id}`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await authClient.post("/verify-email", { token });
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authClient.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.clear();
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await authClient.delete(`/delete-account/${id}`, {
        data: payload,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authClient.get("/auth-status", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editAccount.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })

      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(deleteAccount.fulfilled, (state) => {
        state.user = null;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

// Export the actions
export const { clearAuthState } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
