import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/handleApiError";
import vendorPurchaseRequestService from "../../services/vendorPurchaseRequestService";

export const filteredVendorsByPI = createAsyncThunk(
  "vendorPurchaseRequest/filteredVendorsByPI",
  async (id, { rejectWithValue }) => {
    try {
      const response = await vendorPurchaseRequestService.get(`/filtered-vendors/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const vendorPurchaseRequest = [filteredVendorsByPI];

const vendorPurchaseRequestSlice = createSlice({
  name: "vendorPurchaseRequest",
  initialState: {
    loading: false,
    vendorRequest: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.vendorRequest = [];
      state.error = null;
    };

    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.vendorRequest = action.payload;
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.vendorRequest = [];
      state.error = action.payload;
    };

    vendorPurchaseRequest.forEach((thunk) => {
      builder
        .addCase(thunk.pending, handlePending)
        .addCase(thunk.fulfilled, handleFulfilled)
        .addCase(thunk.rejected, handleRejected);
    });
  },
});

export default vendorPurchaseRequestSlice.reducer;