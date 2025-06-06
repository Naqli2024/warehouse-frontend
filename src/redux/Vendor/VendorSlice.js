import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import vendorService, { authorizedRequest } from "../../services/VendorService";
import handleApiError from "../../helpers/handleApiError";
 
const TOKEN_COOKIE_NAME = "authToken";
 
export const getAllVendors = createAsyncThunk(
  "getAllVendors",
  async (_, { rejectWithValue }) => {
    try {
      const api = vendorService;
      const response = await api.get("/all-vendors");
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
 
export const getVendorById = createAsyncThunk(
  "getVendorById",
  async(id, {rejectWithValue}) => {
    console.log(id)
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      console.log(token)
      const api = authorizedRequest(token);
      const response = await api.get(`/getVendorById/${id}`)
      return response.data.vendor;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)
 
export const sendQuote = createAsyncThunk(
  "sendQuote",
  async ({ vendorId, purchaseIndentId, itemQuotes }, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      const api = authorizedRequest(token);
      const response = await api.post(`/send-quote`, {
        vendorId,
        purchaseIndentId,
        itemQuotes,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
 
export const sendReQuote = createAsyncThunk(
  "sendReQuote",
  async (payload, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      const api = authorizedRequest(token);
      const response = await api.post(`/submit-requote`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
 
export const deletePurchaseRequest = createAsyncThunk(
  "vendor/deletePurchaseRequest",
  async ({ vendorId, purchaseIndentId }, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      const api = authorizedRequest(token);
 
      const response = await api.delete(`/${vendorId}/purchase-request/${purchaseIndentId}`);
 
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);


const vendorSlice = createSlice({
  name: 'vendor',
  initialState : {
    vendors: [],
    vendor: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearVendor: (state) => {
      state.vendor = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Vendors
      .addCase(getAllVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
        state.error = null;
      })
      .addCase(getAllVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
      .addCase(getVendorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorById.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
        state.error = null;
      })
      .addCase(getVendorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendReQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendReQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendReQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePurchaseRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePurchaseRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deletePurchaseRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
 
export const { clearVendor, clearError } = vendorSlice.actions;
export default vendorSlice.reducer;