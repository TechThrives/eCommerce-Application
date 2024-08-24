import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import { useCartContext } from "../Features/CartContext";
import EmptyCart from "../Components/Images/empty-wishlist.png";
import { notify } from "../Utils/Helper";
import { useAppContext } from "../Features/AppContext";

export default function Checkout() {
  const { user } = useAppContext();

  const [additionInfo, setAdditionInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const { cartItems } = useCartContext();

  const subTotal = useMemo(() => {
    return cartItems.cart.reduce((total, item) => total + item.price, 0);
  }, [cartItems]);

  const tax = useMemo(() => {
    return (subTotal * 0.18).toFixed(2)
  }, [subTotal]);

  const grandTotal = useMemo(() => {
    return subTotal + tax;
  }, [subTotal, tax]);

  const handlePayment = async () => {
    console.log(additionInfo);
  };

  return (
    <main className="w-full md:py-20">
      <Wrapper>
        {cartItems.itemCount > 0 ? (
          <>
            {/* Heading  */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[32px] mb-5 font-semibold leading-tight">
                Checkout
              </div>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* Cart Items */}
              <section className="flex-[2]">
                <h2 className="text-lg font-bold">Additional Details</h2>
                <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={additionInfo.firstName}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                      disabled
                    />
                    <label
                      htmlFor="firstName"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      First Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={additionInfo.lastName}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                      disabled
                    />
                    <label
                      htmlFor="lastName"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Last Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={additionInfo.email}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                      disabled
                    />
                    <label
                      htmlFor="email"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={additionInfo.phoneNumber}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=" "
                      required
                      disabled
                    />
                    <label
                      htmlFor="phoneNumber"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Phone Number
                    </label>
                  </div>
                </form>
              </section>

              {/* Cart Summary */}
              <section className="flex-1">
                <h2 className="text-lg font-bold">Details</h2>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  {/* Items */}
                  <div className="text-sm md:text-md">
                    {cartItems.cart.map((item) => (
                      <div key={item.id}>
                        {item.name} - &#8377;{item.price}
                      </div>
                    ))}
                  </div>

                  {/* Total div */}
                  <div className="grid grid-cols-2 border-t mt-5 pt-3">
                    <div className="text-sm md:text-md font-semibold text-gray-600 items-start">
                      Subtotal
                    </div>
                    <div className="text-sm md:text-md font-semibold text-gray-600 flex justify-end">
                      &#8377;{subTotal}
                    </div>

                    <div className="text-sm md:text-md font-semibold text-gray-600 items-start">
                      Tax
                    </div>
                    <div className="text-sm md:text-md font-semibold text-gray-600 flex justify-end">
                      &#8377;{tax}
                    </div>
                    <div className="mt-4 text-md md:text-[16px] font-bold text-black items-start">
                      Grand Total
                    </div>
                    <div className="mt-4 text-md md:text-[16px] font-bold text-black flex justify-end">
                      &#8377;{grandTotal}
                    </div>
                  </div>
                </div>

                {/* Checkout Btn */}
                <div className="flex flex-col justify-between items-center">
                  <button
                    onClick={handlePayment}
                    className="w-full justify-center py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-stone-900 hover:bg-stone-950 focus:outline-none"
                >
                    Purchase
                  </button>
                </div>
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
                className="mt-4 w-full text-center justify-center py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-stone-900 hover:bg-stone-950 focus:outline-none"
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
