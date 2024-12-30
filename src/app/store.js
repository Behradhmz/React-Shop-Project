import { configureStore } from "@reduxjs/toolkit";

import productReducer from "../features/products/productsSlice";

import CartReducer, { subscribeToStore } from "../features/Cart/cartSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: CartReducer,
  },
});

subscribeToStore(store);

export default store;
