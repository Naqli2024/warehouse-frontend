import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import vendorService, { authorizedRequest } from "../../services/VendorService";
import handleApiError from "../../helpers/handleApiError";

export const getAllInventory = createAsyncThunk(
  "getAllInventory",
  async (_, { rejectWithValue }) => {
    try {
      const id = Cookies.get("_id");
      const token = Cookies.get("authToken");
      if (!id) throw new Error("Missing vendor ID in cookies");
      if (!token) throw new Error("Authorization token missing");

      const vendorServiceWithToken = authorizedRequest(token);
      
      const response = await vendorServiceWithToken.get(`/${id}/getAllInventory`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);



export const createVendorInventoryItem = createAsyncThunk(
  'createVendorInventoryItem',
  async (payload, { rejectWithValue }) => {
    try {
      const id = Cookies.get("_id");
      if (!id) {
        return rejectWithValue("Missing vendor ID in cookies. Please log in.");
      }
      const response = await vendorService.post(`/${id}/inventory`, payload, {
        headers: payload instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });

      return response.data;

    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateVendorInventoryItem = createAsyncThunk(
  "updateVendorInventoryItem",
  async ({ itemId, updatedItemData }, { rejectWithValue }) => {
    try {
      const id = Cookies.get("_id");
      if (!id) {
        return rejectWithValue("Missing vendor ID in cookies. Please log in.");
      }
      const response = await vendorService.put(`/${id}/updateInventoryItem/${itemId}`, updatedItemData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteVendorInventoryItem = createAsyncThunk(
  "deleteVendorInventoryItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const id = Cookies.get("_id");
      if (!id) {
        return rejectWithValue("Missing vendor ID in cookies. Please log in.");
      }
      await vendorService.delete(`/${id}/deleteInventoryItem/${itemId}`);
      return itemId; 
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const vendorInventorySlice = createSlice({
  name: "vendorInventory", 
  initialState: {
    vendorInventory: [], 
    loading: false,
    error: null,
  },
  reducers: {
    clearVendorError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorInventory = action.payload; 
      })
      .addCase(getAllInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createVendorInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVendorInventoryItem.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorInventory.push(action.payload);
      })
      .addCase(createVendorInventoryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateVendorInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendorInventoryItem.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        state.vendorInventory = state.vendorInventory.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
      })
      .addCase(updateVendorInventoryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteVendorInventoryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVendorInventoryItem.fulfilled, (state, action) => {
        state.loading = false;
        const deletedItemId = action.payload;
        state.vendorInventory = state.vendorInventory.filter(
          (item) => item._id !== deletedItemId
        );
      })
      .addCase(deleteVendorInventoryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVendorError } = vendorInventorySlice.actions; 
export default vendorInventorySlice.reducer;
