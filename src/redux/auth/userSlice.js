import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import handleApiError from "../../helpers/handleApiError";
import userService, { authorizedRequest } from "../../services/UserService";
 
export const getUserById = createAsyncThunk(
  "getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userService.get(`/getUserById/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
 
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    users: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        const user = action.payload;
        state.loading = false;
        state.users[user._id] = user;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
 
export default userSlice.reducer;