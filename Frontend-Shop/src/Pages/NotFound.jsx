import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import NotFoundImage from "../Components/Images/404-Error.gif";

export default function NotFound() {
  return (
    <main className="w-full md:py-20">
      <Wrapper>
        <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          <img
            src={NotFoundImage}
            width={300}
            height={300}
            className="w-[300px] md:w-[400px]"
            alt="NotFoundImage"
          />

          <span className="text-xl font-bold">
            Oops! That page can't be found.
          </span>
          <span className="text-center mt-4">
            Sorry, the page you're looking for doesn't exist.
          </span>

          {/* Link to homepage */}
          <Link
            className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            to="/"
          >
            Go To Home
          </Link>
        </div>
      </Wrapper>
    </main>
  );
}
