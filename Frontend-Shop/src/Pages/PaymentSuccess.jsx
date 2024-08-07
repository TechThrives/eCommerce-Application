import React from "react";
import Wrapper from "../Components/Wrapper";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-[450px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <div className="text-2xl font-bold">Thanks for shopping with us!</div>
          <div className="text-lg font-bold mt-2">
            Your order has been placed successfully.
          </div>
          <div className="text-base mt-5">
            For any product related query, drop an email to
          </div>
          <div className="underline">shoeshopcontact@shop.com</div>

          <Link href="/" className="font-bold mt-5">
            Continue Shopping
          </Link>
        </div>
      </Wrapper>
    </div>
  );
}
