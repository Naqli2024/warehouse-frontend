import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/authClient";
import Cookies from 'js-cookie';

// Use a string constant for the cookie name
const TOKEN_COOKIE_NAME = "authToken";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/login", credentials);
      const { token } = response.data;
      // Store the token in a cookie
      Cookies.set(TOKEN_COOKIE_NAME, token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    loginData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.loginData = null;
      localStorage.removeItem("_id");
      Cookies.remove(TOKEN_COOKIE_NAME);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
