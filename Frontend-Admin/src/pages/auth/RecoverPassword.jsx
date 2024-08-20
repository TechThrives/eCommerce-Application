import React from "react";

export default function RecoverPassword() {
  return (
    <>
      <div className="bg-white h-screen w-screen flex justify-center items-center">
        <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
          <div className="overflow-hidden sm:rounded-md rounded-none">
            <div className="px-6 py-8">
              <a href="/" className="flex justify-center mb-8">
                <div className="flex flex-row items-center">
                  <img
                    className="logo-dark h-10"
                    src={`${process.env.PUBLIC_URL}/assets/images/Logo.svg`}
                    alt=""
                  />

                  <h1 className="text-lg md:text-xl font-semibold text-black">
                    Digital Shop
                  </h1>
                </div>
              </a>

              <p className="text-center lg:w-3/4 mx-auto mb-6">
                Enter your email address and we'll send you an email with
                instructions to reset your password.
              </p>

              <div className="mb-4">
                <label className="mb-2" htmlFor="LoggingEmailAddress">
                  Email Address
                </label>
                <input
                  id="LoggingEmailAddress"
                  className="form-input"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex justify-center mb-3">
                <button className="btn w-full text-white bg-primary">
                  Reset Password
                </button>
              </div>
            </div>
          </div>

          <p className="text-white text-center mt-8">
            Already have an account ?
            <a href="/sign-in" className="font-medium ms-1">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
