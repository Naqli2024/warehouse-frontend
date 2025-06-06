import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import vendorInventoryImageService from "../../services/vendorInventoryImageService";
import handleApiError from "../../helpers/handleApiError";

export const getAllInventoryImage = createAsyncThunk(
  "getAllInventoryImage",
  async (fileName, { rejectWithValue }) => {
    try {
      const response = await vendorInventoryImageService.get(`/inventoryItems/${fileName}`, {
        responseType: "blob",
      });
      const imageUrl = URL.createObjectURL(response.data);
      return { fileName, url: imageUrl };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const vendorSlice = createSlice({
  name: "vendors",
  initialState: {
    vendorInventory: [],
    vendorInventoryImages: {},  
    loading: false,
    error: null,
  },
  reducers: {
    clearVendorError: (state) => {
      state.error = null;
    },
    setVendorInventory: (state, action) => {
      state.vendorInventory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInventoryImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInventoryImage.fulfilled, (state, action) => {
        state.loading = false;
        const { fileName, url } = action.payload;
        state.vendorInventoryImages[fileName] = { url };
      })
      .addCase(getAllInventoryImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVendorError, setVendorInventory } = vendorSlice.actions;
export default vendorSlice.reducer;