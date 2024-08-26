import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import Loader from "../Components/Loader";
import axiosConfig from "../Utils/axiosConfig";
import { notify } from "../Utils/Helper";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search);
    const sessionId = query.get("session_id");

  const createInvoice = async (sessionId) => {
    try {
      const response = await axiosConfig.post(`/api/invoices`, { sessionId });
      if (response.data) {
        notify("Order created successfully.", "success");
        localStorage.setItem("cart", JSON.stringify([]));
        setTimeout(() => {
          navigate("/account/invoices");
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.details && Array.isArray(data.details) && data.message) {
          notify(data.message || "An unexpected error occurred.", "error");
          navigate("/shop");
        }
      } else {
        notify("An unexpected error occurred.", "error");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (sessionId) {
      createInvoice(sessionId);
    }else{
      navigate("/shop");
    }
  }, [sessionId]);

  return (
    <div className="min-h-[450px] flex items-center">
      <Wrapper>
      {isLoading ? (
          <div className="w-full min-h-screen flex items-center justify-center bg-white absolute inset-0 z-10">
            <Loader />
          </div>
        ) : (
          <>
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
      </>
        )}

      </Wrapper>
    </div>
  );
}
