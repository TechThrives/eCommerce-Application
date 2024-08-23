import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import CartItem from "../Components/CartItem";
import { useCartContext } from "../Features/CartContext";
import EmptyCart from "../Components/Images/empty-wishlist.png";
import { useAppContext } from "../Features/AppContext";

export default function Cart() {
  const { user } = useAppContext();
  const { cartItems } = useCartContext();

  const subTotal = useMemo(() => {
    return cartItems.cart.reduce((total, item) => total + item.price, 0);
  }, [cartItems]);

  return (
    <main className="w-full md:py-20">
      <Wrapper>
        {cartItems.itemCount > 0 ? (
          <>
            {/* Heading  */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[32px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* Cart Items */}
              <section className="flex-[2]">
                <h2 className="text-lg font-bold">Cart Items</h2>
                {cartItems.cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </section>

              {/* Cart Sumamry */}
              <section className="flex-1">
                <h2 className="text-lg font-bold">Summary</h2>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  {/* Subtotal div */}
                  <div className="flex justify-between">
                    <div className="uppercase text-sm md:text-md font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-sm md:text-md font-bold text-black ">
                      MRP: &#8377;{subTotal}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                {/* Checkout Btn */}
                {user ? (
                  <Link
                    to="/checkout"
                    className="flex flex-col justify-between items-center"
                  >
                    <button className="w-1/2 justify-center gap-5 lg:w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
                      Checkout
                    </button>
                  </Link>
                ) : (
                  <Link
                    to="/sign-in"
                    className="flex flex-col justify-between items-center"
                  >
                    <button className="w-1/2 justify-center gap-5 lg:w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
                      Login to Checkout
                    </button>
                  </Link>
                )}
              </section>
            </div>
          </>
        ) : (
          <>
            {/* Empty cart  Screen*/}
            <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
              {/* Empty cart Image  */}
              <img
                src={EmptyCart}
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
                alt="Empty Cart"
              />

              {/* Empty cart Message */}
              <span className="text-xl font-bold">Your cart is empty</span>
              <span className="text-center mt-4">
                Looks like you have not added anything in your cart.
                <br />
                Go ahead and explore top categories.
              </span>

              {/* Link to homepage */}
              <Link
                className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
                to="/shop"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </Wrapper>
    </main>
  );
}
