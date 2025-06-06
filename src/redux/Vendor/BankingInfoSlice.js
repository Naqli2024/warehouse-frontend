import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorService from "../../services/VendorService";
import handleApiError from "../../helpers/handleApiError";
import Cookies from "js-cookie";

export const updateBankingInfo = createAsyncThunk(
  "updateBankingInfo",
  async (updatedData, { rejectWithValue }) => {
    try {
      const api = vendorService;
      const id = Cookies.get("vendorId");

      if (!id) throw new Error("Missing company ID in cookies");

      const response = await api.put(`/update-bankingInfo/${id}`, updatedData);

      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


export const deleteBankingInfo= createAsyncThunk(
  "deleteBankingInfo",
  async (id, { rejectWithValue }) => {
    try {
      const api = vendorService;
      await api.delete(`/delete-bankingInfo/${id}`);
      return id; 
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const vendorThunks = [updateBankingInfo, deleteBankingInfo];

const vendorSlice = createSlice({
  name: "vendors",
  initialState: {
    loading: false,
    vendor: null,
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
      state.vendor = action.payload;
      state.error = null;
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