import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/handleApiError";
import { authorizedRequest } from "../../services/purchaseService";
import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = "authToken"; 

export const createPurchaseOrder = createAsyncThunk(
  "createPurchaseOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      const api = authorizedRequest(token);
      const response = await api.post("/create-purchase-order", payload);
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getPurchaseOrderNo = createAsyncThunk(
  "getPurchaseOrderNo",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      const api = authorizedRequest(token);
      const { data } = await api.get("/purchaseNo");
      return data.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getAllPurchaseOrder = createAsyncThunk(
  "getAllPurchaseOrder",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      const api = authorizedRequest(token);
      const { data } = await api.get("/getAllPurchaseOrder");
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deletePurchaseOrder = createAsyncThunk(
  "deletePurchaseOrder",
  async (purchaseNo, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      const api = authorizedRequest(token);
      const { data } = await api.delete(
        `/deletePurchaseIndentByIndentNo/${purchaseNo}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updatePurchaseOrder = createAsyncThunk(
  "updatePurchaseOrder",
  async ({ purchaseNo, payload }, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TOKEN_COOKIE_NAME);
      const api = authorizedRequest(token);
      const { data } = await api.put(
        `/updatePurchaseOrder/${purchaseNo}`,
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const purchaseOrderSlice = createSlice({
  name: "purchase-order",
  initialState: {
    loading: false,
    purchaseOrder: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.purchaseOrder = action.payload;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.purchaseOrder = null;
      state.error = action.payload;
    };
    [
      createPurchaseOrder,
      getPurchaseOrderNo,
      getAllPurchaseOrder,
      deletePurchaseOrder,
      updatePurchaseOrder,
    ].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default purchaseOrderSlice.reducer;
