import React from "react";
import { useAppContext } from "../utils/AppContext";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/Helper";
import axiosConfig from "../utils/axiosConfig";
import { handleFullScreenClick } from "../script";

export default function RightMenu() {
  const { setUser, setIsLoading } = useAppContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(`/api/auth/sign-out`);
      if (response) {
        notify("Sign out successful.", "success");
        setUser(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        navigate("/sign-in");
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.details && Array.isArray(data.details) && data.message) {
          notify(data.message || "An unexpected error occurred.", "error");
        }
      } else {
        notify("An unexpected error occurred.", "error");
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="profile-menu">
        <div className="flex flex-col items-center h-full gap-4 py-10 px-3">
          <a
            href="#"
            type="button"
            className="flex flex-col items-center gap-1"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/users/avatar-6.jpg`}
              alt="User Image"
              className="rounded-full h-8 w-8"
            />
            <span className="font-medium text-base">Jamie D.</span>
            <span className="text-sm">Admin</span>
          </a>

          <div className="flex flex-col gap-2">
            <button
              data-toggle="fullscreen"
              onClick={handleFullScreenClick}
              type="button"
              className="bg-white rounded-full shadow-md p-2"
            >
              <span className="sr-only">Fullscreen Mode</span>
              <span className="flex items-center justify-center h-6 w-6">
                <i className="uil uil-focus text-2xl"></i>
              </span>
            </button>

            <button
              data-toggle="fullscreen"
              onClick={handleSignOut}
              type="button"
              className="bg-white rounded-full shadow-md p-2"
            >
              <span className="sr-only">Sign Out</span>
              <span className="flex items-center justify-center h-6 w-6">
                <i className="uil uil-sign-out-alt text-2xl"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
