import React, { useState } from "react";
import axiosConfig from "../../utils/axiosConfig";
import { notify } from "../../utils/Helper";
import { useAppContext } from "../../utils/AppContext";
import { useNavigate, Navigate } from "react-router-dom";

export default function SignIn() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
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
    try {
      const response = await axiosConfig.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/sign-in`,
        {
          email: userData.email,
          password: userData.password,
        }
      );
      if (response.data) {
        localStorage.setItem("auth_token", response.data.jwtToken);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        setUserData({ email: "", password: "" });
        navigate("/dashboard");
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
  };

  console.log(user);
  return user ? (
    <Navigate to="/dashboard" />
  ) : (
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
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
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
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
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
                <button
                  className="btn w-full text-white bg-primary"
                  onClick={handleSignIn}
                >
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
