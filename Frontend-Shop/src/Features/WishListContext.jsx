import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create the context
const WishListContext = createContext();

// Initial state
const initialWishListState = {
  wishList: JSON.parse(localStorage.getItem("wishList")) || [],
  itemCount: JSON.parse(localStorage.getItem("wishList"))?.length || 0,
};

// Reducer function to handle state changes
const wishListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishList: [...state.wishList, action.payload],
        itemCount: state.itemCount + 1,
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter(
          (item) => item.id !== action.payload.id
        ),
        itemCount: state.itemCount - 1,
      };
    default:
      return state;
  }
};

// Context provider component
export const WishListProvider = ({ children }) => {
  const [wishListItems, wishListDispatch] = useReducer(
    wishListReducer,
    initialWishListState
  );

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishListItems.wishList));
  }, [wishListItems]);

  return (
    <WishListContext.Provider value={{ wishListItems, wishListDispatch }}>
      {children}
    </WishListContext.Provider>
  );
};

// Custom hook to use the WishList context
export const useWishListContext = () => {
  return useContext(WishListContext);
};
