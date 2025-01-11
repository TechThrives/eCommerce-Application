import React from "react";
import Wrapper from "../components/Wrapper";

const FAQs = () => {
  return (
    <Wrapper>
      <h1 className="text-2xl font-semibold text-center mb-6">
        Frequently Asked Questions (FAQs)
      </h1>
      <div className="text-sm text-slate-800">
        <p className="mb-4">
          Here are some frequently asked questions to help you better understand
          our services:
        </p>

        <div className="mb-4">
          <h2 className="font-semibold">
            1. What is the process for purchasing products?
          </h2>
          <p>
            Simply browse the products on our platform, select the one you want,
            and proceed to checkout. After payment, you will receive the product
            via email.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">
            2. What payment methods do you accept?
          </h2>
          <p>
            We currently accept payments through credit cards (Visa, MasterCard,
            American Express) via Stripe. More payment methods will be added in
            the future.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">3. How do I contact support?</h2>
          <p>
            If you need assistance, feel free to reach out to us through our
            <a href="/contact-us" className="text-blue-500 hover:underline">
              {" "}
              Contact Us
              {" "}
            </a>
            page.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">
            4. How do I receive my digital products?
          </h2>
          <p>
            After completing the payment, you will receive the product via
            email. Make sure to check your inbox and spam folder.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default FAQs;
