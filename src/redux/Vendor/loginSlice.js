import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorService from "../../services/VendorService";
import Cookies from "js-cookie";
import handleApiError from "../../helpers/handleApiError";

// Async thunk for vendor login
export const vendorLogin = createAsyncThunk(
  "vendor/login",
  async (authData, { rejectWithValue }) => {
    const payload = {
      login: authData.emailId,
      password: authData.password,
    };
    try {
      const response = await vendorService.post("/vendor-login", payload);
      const { token, vendorId } = response.data;

      // Set token and vendorId in cookies
      Cookies.set("authToken", token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("_id", vendorId, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const vendorLoginSlice = createSlice({
  name: "vendor-login",
  initialState: {
    loading: false,
    error: null,
    vendorData: null,
  },
  reducers: {
    vendorLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.vendorData = null;
      // Remove all cookies manually
      Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(vendorLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(vendorLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorData = action.payload;
      })
      .addCase(vendorLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { vendorLogout } = vendorLoginSlice.actions;
export default vendorLoginSlice.reducer;
