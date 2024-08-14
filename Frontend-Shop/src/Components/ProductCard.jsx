import React from "react";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useWishListContext } from "../Features/WishListContext";
import { getDiscountedPricePercentage, notify } from "../Utils/Helper";

const ProductCard = ({ product }) => {
  const { wishListItems, wishListDispatch } = useWishListContext();

  const isInWishlist = wishListItems.wishList.some(
    (item) => item.id === product.id
  );

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

  return (
    <Link
      to={`/product/${product.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer flex flex-col items-center relative"
    >
      <img
      className="h-full object-cover"
        src={product.imageUrls[0]}
        alt={product.name}
      />
      <div className="py-3 text-black/[0.9] w-full">
        <h2 className="text-xs md:text-sm font-semibold mb-2 truncate-multiline-4">
          {product.name}
        </h2>
        <div className="flex items-center text-black/[0.7]">
          <p className="mr-2 text-xs md:text-sm font-semibold text-black">
            &#8377;{product.price}
          </p>

          {product.originalPrice && (
            <>
              <p className="text-xs md:text-sm font-medium line-through text-black/[0.7]">
                &#8377;{product.originalPrice}
              </p>
              <p className="text-xs md:text-sm ml-auto font-medium text-green-500">
                {getDiscountedPricePercentage(
                  product.originalPrice,
                  product.price
                )}
                % off
              </p>
            </>
          )}
        </div>
      </div>
      <span
        className="absolute top-2 right-2 size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 shadow"
        onClick={handleHeartClick}
      >
        {isInWishlist ? (
          <IoMdHeart
            className="text-[19px] md:text-[24px]"
            style={{ fill: "#ff0000" }}
          />
        ) : (
          <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
        )}
      </span>
    </Link>
  );
};

export default ProductCard;
