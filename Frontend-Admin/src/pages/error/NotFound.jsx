import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="bg-white h-screen w-screen flex justify-center items-center">
        <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
          <div className="overflow-hidden sm:rounded-md rounded-none">
            <div className="px-6 py-8">
              <a href="/" className="flex justify-center mb-8">
              <div className="flex flex-row items-center">
              <img className="logo-dark h-10" src={`${process.env.PUBLIC_URL}/assets/images/Logo.svg`}
             alt="" />

              <h1 className="text-lg md:text-xl font-semibold text-black">
                Digital Shop
              </h1>
            </div>
              </a>

              <div className="w-1/2 mx-auto block my-8">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/404-error.svg`}
                  title="Maintenance"
                  alt="Maintenance"
                />
              </div>

              <h3 className="text-dark mb-4 mt-6 text-center text-3xl">
                Page Not Found
              </h3>

              <p className="text-dark/75 mb-8 mx-auto text-base text-center">
                It's looking like you may have taken a wrong turn. Don't
                worry... it happens to the best of us. You might want to check
                your internet connection.
              </p>

              <div className="flex justify-center">
                <a href="/" className="btn text-white bg-primary">
                  Back To Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
