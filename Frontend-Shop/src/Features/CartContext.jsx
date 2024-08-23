import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAppContext } from "./AppContext";
import axiosConfig from "../Utils/axiosConfig";
import { notify } from "../Utils/Helper";

// Create the context
const CartContext = createContext();

// Initial state
const initialCartState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  itemCount: JSON.parse(localStorage.getItem("cart"))?.length || 0,
  userId: null,
};

// Reducer function to handle state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      if (state.userId) {
        saveProductToBackend(state.userId, action.payload.id); // Save single product to backend
      }
      return {
        ...state,
        cart: updatedCart,
        itemCount: updatedCart.length,
      };
    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      if (state.userId) {
        removeProductFromBackend(state.userId, action.payload.id); // Remove single product from backend
      }
      return {
        ...state,
        cart: filteredCart,
        itemCount: filteredCart.length,
      };
    case "SET_CART":
      return {
        ...state,
        cart: action.payload.cart,
        itemCount: action.payload.cart.length,
      };
    default:
      return state;
  }
};

// Context provider component
export const CartProvider = ({ children }) => {
  const { user } = useAppContext(); // Get user from AppContext
  const [cartItems, cartDispatch] = useReducer(cartReducer, {
    ...initialCartState,
    userId: user?.id || null,
  });

  useEffect(() => {
    if (user && user.id) {
      axiosConfig
        .get(`/api/carts/user/${user.id}`)
        .then((response) => {
          cartDispatch({ type: "SET_CART", payload: { cart: response.data.products } });
        })
        .catch((error) => {
          handleBackendError(error);
        });
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cartItems, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const saveProductToBackend = async (userId, productId) => {
  try {
    const cartDTO = { userId, productId };
    await axiosConfig.post(`/api/carts/add`, cartDTO);
    console.log("Product saved to backend successfully");
  } catch (error) {
    handleBackendError(error);
  }
};

const removeProductFromBackend = async (userId, productId) => {
  try {
    const cartDTO = { userId, productId };
    await axiosConfig.post(`/api/carts/remove`, cartDTO);
    console.log("Product removed from backend successfully");
  } catch (error) {
    handleBackendError(error);
  }
};

const handleBackendError = (error) => {
  if (error.response) {
    const { data } = error.response;
    if (data.details && Array.isArray(data.details) && data.message) {
      notify(data.message || "An unexpected error occurred.", "error");
    }
  } else {
    notify("An unexpected error occurred.", "error");
  }
};

// Custom hook to use the Cart context
export const useCartContext = () => {
  return useContext(CartContext);
};
