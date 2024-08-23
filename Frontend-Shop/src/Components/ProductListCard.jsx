import React from "react";
import { Link } from "react-router-dom";
import { useWishListContext } from "../Features/WishListContext";
import { getDiscountedPricePercentage, notify } from "../Utils/Helper";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from "react-icons/md";
import { useCartContext } from "../Features/CartContext";

const ProductListCard = ({ product }) => {
  const { wishListItems, wishListDispatch } = useWishListContext();
  const { cartItems, cartDispatch } = useCartContext();

  const isInWishlist = wishListItems.wishList.some(
    (item) => item.id === product.id
  );

  const isInCart = cartItems.cart.some((item) => item.id === product.id);

  const handleHeartClick = (event) => {
    event.preventDefault();
    if (isInWishlist) {
      wishListDispatch({ type: "REMOVE_FROM_WISHLIST", payload: product });
      notify("Product removed from wishlist", "success");
    } else {
      wishListDispatch({ type: "ADD_TO_WISHLIST", payload: product });
      notify("Product added to wishlist", "success");
    }
  };
  const handleClick = (event) => {
    event.preventDefault();
    if (isInCart) {
      cartDispatch({ type: "REMOVE_FROM_CART", payload: product });
      notify("Product removed from cart", "success");
    } else {
      cartDispatch({ type: "ADD_TO_CART", payload: product });
      notify("Product added to cart", "success");
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="overflow-hidden">
      <div className="group relative duration-500 w-full mx-auto">
        <div className="flex items-center">
          <div className="relative overflow-hidden shrink-0 shadow group-hover:shadow-lg rounded-md duration-500">
            <img
              className="h-48 object-cover w-48 rounded-md group-hover:scale-110 duration-500"
              src={product.imageUrls[0]}
              alt={product.name}
            />
            <ul className="list-none absolute top-[4px] end-1 duration-500 space-y-1">
              <span
                className="absolute top-2 right-2 size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-black[0.8] shadow"
                onClick={handleHeartClick}
              >
                {isInWishlist ? (
                  <IoMdHeart
                    className="text-[15px] md:text-[20px]"
                    style={{ fill: "#ff0000" }}
                  />
                ) : (
                  <IoMdHeartEmpty className="text-[15px] md:text-[20px]" />
                )}
              </span>
            </ul>
          </div>
          <div className="ms-6 mt-2">
            <p className=" text-black text-md md:text-lg font-semibold truncate-multiline-2">
              {product.name}
            </p>
            <p className="font-medium text-black/[0.8] text-sm md:text-md mt-1 truncate-multiline-2">
              {product.shortDescription}
            </p>
            <p className="text-xs md:text-sm font-semibold text-black">
              <span className=" text-black/[0.7] line-through">
                &#8377;{product.originalPrice}
              </span>{" "}
              &#8377;{product.price}
            </p>
            <p className="text-xs md:text-sm mt-1 font-medium text-green-500">
              {getDiscountedPricePercentage(
                product.originalPrice,
                product.price
              )}
              % off
            </p>
            <div className="mt-4">
              <div
                onClick={handleClick}
                className="py-2 px-2 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-stone-950 text-white rounded-md"
              >
                {isInCart ? (
                  <MdOutlineRemoveShoppingCart
                  className="text-[20px]"
                  style={{ fill: "#ffffff" }}
                />
                ) : (
                  <MdOutlineShoppingCart
                  className="text-[20px]"
                  style={{ fill: "#ffffff" }}
                />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductListCard;
