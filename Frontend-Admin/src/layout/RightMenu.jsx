import React from "react";
import { handleFullScreenClick } from "../script";

export default function RightMenu() {
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

          <div className="flex">
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
          </div>
        </div>
      </div>
    </>
  );
}
