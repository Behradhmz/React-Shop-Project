import { createContext, useContext, useReducer, useEffect } from "react";
import { sumProducts } from "../Helpers/Helper";

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

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems?.find((item) => item.id === action.payload.id)) {
        return {
          ...state,
          selectedItems: [
            ...(state.selectedItems || []),
            { ...action.payload, quantity: 1 },
          ], // اگر selectedItems تعریف نشده بود، از آرایه خالی استفاده می‌شود
          ...sumProducts([
            ...(state.selectedItems || []),
            { ...action.payload, quantity: 1 },
          ]),
          checkout: false,
        };
      }
      return state;
    case "REMOVE_ITEM":
      const newSelectedItem = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItems: [...newSelectedItem],
        ...sumProducts(newSelectedItem),
      };
    case "INCREASE":
      const increaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[increaseIndex].quantity++;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    case "DECREASE":
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[decreaseIndex].quantity--;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        chekout: true,
      };

    default:
      throw new Error("invalid Action");
  }
};

const Cartcontext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  

  return (
    <Cartcontext.Provider value={{ state, dispatch }}>
      {children}
    </Cartcontext.Provider>
  );
}

const useCart = () => {
  const { state, dispatch } = useContext(Cartcontext);
  return [state, dispatch];
};

export default CartProvider;
export { useCart };
