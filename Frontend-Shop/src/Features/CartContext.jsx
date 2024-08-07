import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Initial state
const initialCartState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  itemCount: JSON.parse(localStorage.getItem("cart"))?.length || 0,
};

// Reducer function to handle state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        itemCount: state.itemCount + 1,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
        itemCount: state.itemCount - 1,
      };
    default:
      return state;
  }
};

// Context provider component
export const CartProvider = ({ children }) => {
  const [cartItems, cartDispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems.cart));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCartContext = () => {
  return useContext(CartContext);
};
