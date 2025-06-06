import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorService from "../../services/VendorService";
import handleApiError from "../../helpers/handleApiError";

export const createVendor = createAsyncThunk(
  "createVendor",
  async (vendorData, { rejectWithValue }) => {
    try {
      const api = vendorService;
      const response = await api.post("/create-vendor", vendorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const verifyVendorEmail = createAsyncThunk(
  "vendor/verifyVendorEmail",
  async ({ token, email }, { rejectWithValue }) => {
    try {
      const api = vendorService;
      const response = await api.get(`/verify-email`, {
        params: { token, email },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateVendor = createAsyncThunk(
  "updateVendor",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const api = vendorService;
      const response = await api.put(`/editVendorById/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteVendor = createAsyncThunk(
  "deleteVendor",
  async (id, { rejectWithValue }) => {
    try {
      const api = vendorService;
      await api.delete(`/deleteVendorById/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const vendorThunks = [
  createVendor,
  updateVendor,
  deleteVendor,
  verifyVendorEmail,
];

const vendorSlice = createSlice({
  name: "vendors",
  initialState: {
    loading: false,
    vendor: null,
    verification: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.vendor = null;
      state.error = null;
    };

    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.error = null;
      if (action.type === verifyVendorEmail.fulfilled.type) {
        state.verification = action.payload;
      } else {
        state.vendor = action.payload;
      }
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.vendor = null;
      state.error = action.payload;
    };

    vendorThunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, handlePending)
        .addCase(thunk.fulfilled, handleFulfilled)
        .addCase(thunk.rejected, handleRejected);
    });
  },
});

export default vendorSlice.reducer;
