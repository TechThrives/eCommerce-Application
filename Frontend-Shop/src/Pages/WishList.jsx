import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import WishListItem from "../Components/WishListItem";
import { useWishListContext } from "../Features/WishListContext";
import EmptyWishList from "../Components/Images/empty-wishlist.png";

export default function WishList() {
  const { wishListItems } = useWishListContext();

  return (
    <div className="w-full md:py-20">
      <Wrapper className="max-w-[800px]">
        {wishListItems.itemCount > 0 ? (
          <>
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Your WishList
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {wishListItems.wishList.map((item) => (
                <WishListItem key={item.id} item={item} />
              ))}
            </div>

            <Link to="/shop" className="flex justify-center">
              <button className="w-full justify-center py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-stone-900 hover:bg-stone-950 focus:outline-none">
                Continue Shopping
              </button>
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center pb-[50px] md:-mt-14">
            <img
              src={EmptyWishList}
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
              alt="Empty WishList"
            />
            <span className="text-xl font-bold">Your WishList is Empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything to your wish list.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              className="mt-4 w-full text-center justify-center py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-stone-900 hover:bg-stone-950 focus:outline-none"
              to="/shop"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
