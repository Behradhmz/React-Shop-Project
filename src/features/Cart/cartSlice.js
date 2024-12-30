import { createSlice } from "@reduxjs/toolkit";
import { sumPirce, sumQuantity } from "../../Helpers/Helper";

const getInitialState = () => {
  const savedState = localStorage.getItem("cartState");

  // اگر savedState وجود دارد و معتبر است، آن را تجزیه کن
  if (savedState && savedState !== "undefined") {
    try {
      return JSON.parse(savedState); // بازیابی از localStorage
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: false,
      }; // مقدار پیش‌فرض
    }
  } else {
    // اگر savedState وجود نداشته باشد یا "undefined" باشد
    return {
      selectedItems: [],
      itemsCounter: 0,
      total: 0,
      checkout: false,
    }; // مقدار پیش‌فرض
  }
};

const initialState = getInitialState();

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.selectedItems.find((i) => i.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
        state.total = sumPirce(state.selectedItems);
        state.itemsCounter = sumQuantity(state.selectedItems);
        state.checkout = false;
      }
    },
    removeItem: (state, action) => {
      const newSelectedItems = state.selectedItems.filter(
        (i) => i.id !== action.payload.id
      );
      state.selectedItems = newSelectedItems;
      state.total = sumPirce(state.selectedItems);
      state.itemsCounter = sumQuantity(state.selectedItems);
    },
    increase: (state, action) => {
      const increaseIndex = state.selectedItems.findIndex(
        (i) => i.id === action.payload.id
      );
      state.selectedItems[increaseIndex].quantity++;
      state.total = sumPirce(state.selectedItems);
      state.itemsCounter = sumQuantity(state.selectedItems);
    },
    decrease: (state, action) => {
      const decreaseIndex = state.selectedItems.findIndex(
        (i) => i.id === action.payload.id
      );
      state.selectedItems[decreaseIndex].quantity--;
      state.total = sumPirce(state.selectedItems);
      state.itemsCounter = sumQuantity(state.selectedItems);
    },
    checkout: (state) => {
      state.selectedItems = [];
      state.checkout = true;
      state.total = 0;
      state.itemsCounter = 0;
    },
  },
});

const saveStateToLocalStorage = (state) => {
    try {
      console.log("State before saving to localStorage:", state); // برای دیباگ
  
      const serializedState = JSON.stringify(state);
      if (serializedState) {
        localStorage.setItem("cartState", serializedState);
      } else {
        console.error("Serialized state is undefined or null.");
      }
    } catch (error) {
      console.error("Could not save state to localStorage:", error);
    }
  };

// تابعی برای ذخیره خودکار state بعد از هر تغییری
export const subscribeToStore = (store) => {
  store.subscribe(() => {
    saveStateToLocalStorage(store.getState().cart);
  });
};

export default CartSlice.reducer;

export const { addItem, removeItem, increase, decrease, checkout } =
  CartSlice.actions;
