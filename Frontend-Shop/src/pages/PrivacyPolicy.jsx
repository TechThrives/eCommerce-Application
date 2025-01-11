import React from "react";
import Wrapper from "../components/Wrapper";

const PrivacyPolicy  = () => {
  return (
    <Wrapper>
      <h1 className="text-2xl font-semibold text-center mb-6">
        Privacy Policy
      </h1>
      <div className="text-sm text-slate-800">
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information.
        </p>

        <h2 className="font-semibold mt-6">1. Information We Collect</h2>
        <p>
          We collect personal information such as your name, email address, and
          payment information when you use our services.
        </p>

        <h2 className="font-semibold mt-6">2. How We Use Your Information</h2>
        <p>
          Your personal information is used to process orders, provide customer
          support, and improve our services. We do not share your information
          with third parties without your consent.
        </p>

        <h2 className="font-semibold mt-6">
          3. Cookies and Tracking Technologies
        </h2>
        <p>
          We use cookies and other tracking technologies to enhance your
          experience and collect usage data. You can disable cookies in your
          browser settings.
        </p>

        <h2 className="font-semibold mt-6">4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your
          personal information. However, no method of transmission over the
          internet is 100% secure.
        </p>

        <h2 className="font-semibold mt-6">5. Third-Party Services</h2>
        <p>
          We may use third-party services such as Stripe for payment processing.
          These services have their own privacy policies, and we encourage you
          to review them.
        </p>

        <h2 className="font-semibold mt-6">6. Changes to Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and the updated policy will be effective
          immediately upon posting.
        </p>

        <p className="my-4">
          If you have any questions about this Privacy Policy, feel free to{" "}
          <a href="/contact-us" className="text-blue-500 hover:underline">
            contact us
          </a>
          .
        </p>
      </div>
    </Wrapper>
  );
};

export default PrivacyPolicy ;
