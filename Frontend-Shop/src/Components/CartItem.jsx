import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCartContext } from "../Features/CartContext";
import { getDiscountedPricePercentage, notify } from "../Utils/Helper";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const { cartDispatch } = useCartContext();
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[70px] md:w-[140px]">
        <img src={item.imageUrls[0]} alt={item.name} width={150} height={150} />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <Link
          to={`/product/${item.slug}`}
          className="flex flex-col md:flex-row justify-between"
        >
          {/* PRODUCT TITLE */}
          <div className="text-md md:text-lg font-semibold text-black/[0.8] truncate-multiline-2">
            {item.name}
          </div>
        </Link>

        {/* PRODUCT SUBTITLE */}
        <div className="text-xs md:text-sm font-medium text-black/[0.7] truncate-multiline-2">
          {item.shortDescription}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-2 text-black/[0.8] text-xs md:text-sm">
            <div className="flex items-center md:flex-col">
              <div className="text-xs md:text-sm font-bold text-black/[0.7] mt-2">
                MRP : &#8377;{item.price}
              </div>
            </div>
            <div className="flex items-center md:flex-col">
              <div className="text-xs md:text-sm font-bold text-green-500 mt-2">
                {getDiscountedPricePercentage(item.originalPrice, item.price)}%
                off
              </div>
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => {
              cartDispatch({ type: "REMOVE_FROM_CART", payload: item });
              notify("Product removed from cart", "success");
            }}
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
