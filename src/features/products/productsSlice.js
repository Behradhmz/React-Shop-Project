import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/config";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const FetchProducts = createAsyncThunk("product/FetchProducts", () => {
  return api.get("/products");
});

const productsSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(FetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(FetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export { FetchProducts };

export default productsSlice.reducer;
