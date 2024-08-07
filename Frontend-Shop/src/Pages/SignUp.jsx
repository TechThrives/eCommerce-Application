import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import AuthPage from "../Components/Images/AuthPage.svg";
import { IoIosMail } from "react-icons/io";
import { MdKey } from "react-icons/md";

export default function SignUp() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSignUp = () => {
    console.log(userData);
  };
  return (
    <>
      <Wrapper>
        <div className="m-2 md:m-16 rounded-sm border border-stroke bg-white shadow-default ">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full lg:block lg:w-1/2">
              <div className="py-17.5 px-26 text-center">
                <span className="mt-15 inline-block">
                  <img
                    src={AuthPage}
                    width={300}
                    height={300}
                    className="w-[300px] md:w-[400px]"
                    alt=""
                  />
                </span>
              </div>
            </div>

            <div className="w-full border-stroke lg:w-1/2 lg:border-l-2">
              <div className="w-full p-4 sm:p-12.5 lg:p-17.5">
                <h2 className="my-9 text-center text-2xl font-bold text-black sm:text-title-xl2">
                  Sign Up
                </h2>

                <div>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=""
                      required
                    />
                    <label
                      htmlFor="first_name"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      First Name
                    </label>
                  </div>

                  <div className="relative mb-6">
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=""
                      required
                    />
                    <label
                      htmlFor="last_name"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Last Name
                    </label>
                  </div>

                  <div className="relative mb-6">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=""
                      required
                    />
                    <span className="absolute right-4 top-4">
                      <IoIosMail className="text-[24px] fill-current" />
                    </span>
                    <label
                      htmlFor="email"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative mb-6">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      className="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                      placeholder=""
                      required
                    />
                    <span className="absolute right-4 top-4">
                      <MdKey className="text-[24px] fill-current" />
                    </span>
                    <label
                      htmlFor="password"
                      className="ml-1 absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Password
                    </label>
                  </div>

                  <div className="mb-5">
                    <button
                      onClick={handleSignUp}
                      className=" w-full py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className="mt-6 text-center font-semibold">
                    <p>
                      Already have an account?{" "}
                      <Link to="/sign-in" className="text-primary underline">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
