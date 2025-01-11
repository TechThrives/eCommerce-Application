import React from "react";
import Wrapper from "../components/Wrapper";


const HowItWorks = () => {
  return (
    <Wrapper>
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">How It Works</h1>
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                1
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Browse Products</h2>
              <p className="mt-2 text-sm">
                Explore our wide range of digital products, including eBooks, software, and templates. Each product is tailored to meet your needs.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                2
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Add to Cart</h2>
              <p className="mt-2 text-sm">
                Select the products you like and add them to your cart. You can review your selection before proceeding to checkout.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                3
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Checkout</h2>
              <p className="mt-2 text-sm">
                Complete the checkout process securely using your preferred payment method. Your download link will be sent via email.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                4
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Download Instantly</h2>
              <p className="mt-2 text-sm">
                Receive an email with your download link immediately after payment. Access your purchased products anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
      </Wrapper>
  );
};

export default HowItWorks;
