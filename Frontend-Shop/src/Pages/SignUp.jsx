import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAppContext } from "../Features/AppContext";
import axiosConfig from "../Utils/axiosConfig";
import { notify } from "../Utils/Helper";
import Wrapper from "../Components/Wrapper";
import Logo from "../Components/Images/Logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CountryCodes } from "../Utils/CountryCodes";

export default function SignUp() {
  const { user, setIsLoading } = useAppContext();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(CountryCodes[97]);
  
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!userData.firstName.trim()) {
      notify("First name is required.", "error");
      return;
    }

    if (!userData.lastName.trim()) {
      notify("Last name is required.", "error");
      return;
    }

    if (!userData.phoneNumber.trim()) {
      notify("Phone number is required.", "error");
      return;
    }

    if (!userData.email.trim()) {
      notify("Email is required.", "error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      notify("Email should be valid.", "error");
      return;
    }

    if (!userData.password.trim()) {
      notify("Password is required.", "error");
      return;
    }

    if (!userData.confirmPassword.trim()) {
      notify("Confirm password is required.", "error");
      return;
    }

    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{6,}$/.test(
        userData.password
      )
    ) {
      notify(
        "Password must be at least 6 characters long and contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace.",
        "error"
      );
      return;
    }

    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{6,}$/.test(
        userData.confirmPassword
      )
    ) {
      notify(
        "Confirm Password must be at least 6 characters long and contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace.",
        "error"
      );
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      notify("Passwords do not match.", "error");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosConfig.post(`/api/auth/sign-up`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber:  selectedCountry.dial_code + userData.phoneNumber,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      });
      if (response.data) {
        notify("Sign up successful.", "success");
        setUserData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/sign-in");
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.details && Array.isArray(data.details) && data.message) {
          notify(`${data.message}: ${data.details.join(", ")}`, "error");
        } else {
          notify(data.message || "An unexpected error occurred.", "error");
        }
      } else {
        notify("An unexpected error occurred.", "error");
      }
    }
    setIsLoading(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return user ? (
    <Navigate to="/" />
  ) : (
    <>
      <Wrapper>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mb-8">
            <Link
              className="flex flex-row items-center justify-center mt-4"
              to="/"
            >
              <img src={Logo} className="w-[40px] mr-2" alt="logo" />
              <h3 className="text-gray-800 text-2xl font-semibold">Digital Shop</h3>
            </Link>
            <h4 className="text-gray-800 text-base font-semibold mt-2">
              Sign Up to your account
            </h4>
          </div>

          <form>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  First Name
                </label>
                <input
                  name="firstName"
                  onChange={handleChange}
                  value={userData.firstName}
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Last Name
                </label>
                <input
                  name="lastName"
                  onChange={handleChange}
                  value={userData.lastName}
                  type="text"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={userData.email}
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="bg-gray-100 text-gray-800 text-sm px-3 py-3.5 rounded-l-md focus:bg-transparent outline-blue-500 transition-all border-r border-gray-300"
                    >
                      {selectedCountry.dial_code}
                      <span className="ms-2">&#9660;</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 max-h-60 overflow-y-auto">
                        <ul className="py-2 text-sm text-gray-800">
                          {CountryCodes.map((country) => (
                            <li key={country.code}>
                              <button
                                type="button"
                                onClick={() => handleCountryChange(country)}
                                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {country.dial_code} ({country.name})
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <input
                    name="phoneNumber"
                    type="number"
                    onChange={handleChange}
                    value={userData.phoneNumber}
                    className="bg-gray-100 text-gray-800 text-sm px-4 py-3.5 rounded-r-md focus:bg-transparent outline-blue-500 transition-all flex-1 appearance-none"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={userData.password}
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                    placeholder="Enter password"
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="absolute right-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEye
                      className="absolute right-4 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={userData.confirmPassword}
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                    placeholder="Enter confirm password"
                  />
                  {showConfirmPassword ? (
                    <FaEyeSlash
                      className="absolute right-4 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <FaEye
                      className="absolute right-4 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="button"
                className="py-3.5 w-full px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-stone-900 hover:bg-stone-950 focus:outline-none"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </form>
          <button className="py-3.5 w-full px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-stone-900 hover:bg-stone-950 focus:outline-none border mt-5 flex justify-center items-center">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Sign Up with Google
          </button>
          <div className="mt-6 text-center font-semibold">
            <p>
              Already have an account?{" "}
              <Link to="/sign-in" className="text-primary underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
