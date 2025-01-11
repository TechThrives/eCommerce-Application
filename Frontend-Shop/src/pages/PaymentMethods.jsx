import React from "react";
import Wrapper from "../components/Wrapper";

const PaymentMethods = () => {
  return (
    <Wrapper>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Payment Methods
        </h1>
        <div className="text-sm text-slate-800 mb-4">
          <p>We accept the following payment method:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>
              Credit Cards (Visa, MasterCard, American Express) via Stripe
            </li>
          </ul>
          <p className="mt-4">
            All transactions are processed securely to ensure your privacy and
            safety. We use Stripe's advanced encryption technology for secure
            payment processing.
          </p>
          <p className="mt-4">
            Supported currencies for payments: IND.
          </p>
          <p className="mt-4 text-sm text-slate-800">
            Please note: We are working on adding more payment options in the
            future!
          </p>
          <p className="mt-4 text-sm text-slate-800">
            For any issues with payments, please feel free to{" "}
            <a href="/contact-us" className="text-blue-500 hover:underline">
              contact our support team
            </a>
            .
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default PaymentMethods;
