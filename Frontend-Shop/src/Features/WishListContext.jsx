import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAppContext } from "./AppContext";
import axiosConfig from "../Utils/axiosConfig";
import { notify } from "../Utils/Helper";

// Create the context
const WishListContext = createContext();

// Initial state
const initialWishListState = {
  wishList: JSON.parse(localStorage.getItem("wishList")) || [],
  itemCount: JSON.parse(localStorage.getItem("wishList"))?.length || 0,
  userId: null,
};

// Reducer function to handle state changes
const wishListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      const updatedWishList = [...state.wishList, action.payload];
      if (state.userId) {
        saveProductToBackend(state.userId, action.payload.id); // Save single product to backend
      }
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
      return {
        ...state,
        wishList: updatedWishList,
        itemCount: updatedWishList.length,
      };
    case "REMOVE_FROM_WISHLIST":
      const filteredWishList = state.wishList.filter(
        (item) => item.id !== action.payload.id
      );
      if (state.userId) {
        removeProductFromBackend(state.userId, action.payload.id); // Remove single product from backend
      }
      localStorage.setItem("wishList", JSON.stringify(filteredWishList));
      return {
        ...state,
        wishList: filteredWishList,
        itemCount: filteredWishList.length,
      };
    case "SET_WISHLIST":
      return {
        ...state,
        wishList: action.payload.products,
        itemCount: action.payload.productCount,
      };
    case "SET_USER":
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

// Context provider component
export const WishListProvider = ({ children }) => {
  const { user } = useAppContext(); // Get user from AppContext
  const [wishListItems, wishListDispatch] = useReducer(wishListReducer, {
    ...initialWishListState,
    userId: user?.id || null,
  });

  useEffect(() => {
    if (user && user.id) {
      axiosConfig
        .get(`/api/wishlists/user/${user.id}`)
        .then((response) => {
          localStorage.setItem(
            "wishList",
            JSON.stringify(response.data.products)
          );
          wishListDispatch({
            type: "SET_WISHLIST",
            payload: {
              products: response.data.products,
              productCount: response.data.productCount,
            },
          });
        })
        .catch((error) => {
          handleBackendError(error);
        });
    } else {
      wishListDispatch({ type: "SET_USER", payload: null });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishListItems.wishList));
  }, [wishListItems]);

  return (
    <WishListContext.Provider value={{ wishListItems, wishListDispatch }}>
      {children}
    </WishListContext.Provider>
  );
};

const saveProductToBackend = async (userId, productId) => {
  try {
    const wishListDTO = {
      userId,
      productId,
    };
    await axiosConfig.post(`/api/wishlists/add`, wishListDTO);
  } catch (error) {
    handleBackendError(error);
  }
};

const removeProductFromBackend = async (userId, productId) => {
  try {
    const wishListDTO = {
      userId,
      productId,
    };
    await axiosConfig.post(`/api/wishlists/remove`, wishListDTO);
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

// Custom hook to use the WishList context
export const useWishListContext = () => {
  return useContext(WishListContext);
};
