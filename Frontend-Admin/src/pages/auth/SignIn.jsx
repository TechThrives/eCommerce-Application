import React from "react";

export default function SignIn() {
  return (
    <>
      <div className="bg-white h-screen w-screen flex justify-center items-center">
        <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
          <div className="overflow-hidden sm:rounded-md rounded-none">
            <div className="px-6 py-8">
              <a href="/" className="flex justify-center mb-8">
                <img
                  className="h-6"
                  src={`${process.env.PUBLIC_URL}/assets/images/logo-dark.png`}
                  alt=""
                />
              </a>

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

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="loggingPassword">Password</label>
                  <a href="/recover-password" className="text-sm text-primary">
                    Forget Password ?
                  </a>
                </div>
                <input
                  id="loggingPassword"
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox rounded"
                  id="checkbox-signin"
                />
                <label className="ms-2" htmlFor="checkbox-signin">
                  Remember me
                </label>
              </div>

              <div className="flex justify-center mb-3">
                <button className="btn w-full text-white bg-primary">
                  Sign In
                </button>
              </div>
            </div>
          </div>

          {/* <p className="text-white text-center mt-8">
            Create an Account ?
            <a href="auth-register.html" className="font-medium ms-1">
              Register
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
}
