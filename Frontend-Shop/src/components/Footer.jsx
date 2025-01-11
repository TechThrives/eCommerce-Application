import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-14 pb-3">
      <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              to="/shop"
              className="font-oswald font-medium uppercase text-sm cursor-pointer"
            >
              Browse Products
            </Link>
            <Link
              to="/how-it-works"
              className="font-oswald font-medium uppercase text-sm cursor-pointer"
            >
              How It Works
            </Link>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium uppercase text-sm">
                Support
              </div>
              <Link
                to="/payment-methods"
                className="text-sm text-white/[0.5] hover:text-white cursor-pointer"
              >
                Payment Methods
              </Link>
              <Link
                to="/about-us"
                className="text-sm text-white/[0.5] hover:text-white cursor-pointer"
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className="text-sm text-white/[0.5] hover:text-white cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-4 justify-center md:justify-start">
          <Link className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaFacebookF size={20} />
          </Link>
          <Link className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaTwitter size={20} />
          </Link>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaYoutube size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaInstagram size={20} />
          </div>
        </div>
        {/* RIGHT END */}
      </Wrapper>
      <Wrapper className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
        {/* LEFT START */}
        <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
          &copy; {new Date().getFullYear()} Digital Shop. All Rights Reserved.
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            <Link to="/faqs">FAQs</Link>
          </div>
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
          <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
        {/* RIGHT END */}
      </Wrapper>
    </footer>
  );
}
