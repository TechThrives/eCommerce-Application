import React from "react";
import { handleClick, handleRightMenuClick } from "../script";
import { useAppContext } from "../utils/AppContext";

export default function Header() {
  const { appData } = useAppContext();
  return (
    <>
      <header className="app-header flex items-center px-5 gap-4">
        <a href="index.html" className="logo-box">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo-sm.png`}
            className="h-6"
            alt="Small logo"
          />
        </a>

        <button
          id="button-toggle-menu"
          onClick={handleClick}
          className="nav-link p-2"
        >
          <span className="sr-only">Menu Toggle Button</span>
          <span className="flex items-center justify-center h-6 w-6">
            <i className="uil uil-bars text-2xl"></i>
          </span>
        </button>

        <h4 className="text-slate-900 text-lg font-medium">{appData.header}</h4>

        <button
          id="button-toggle-profile"
          onClick={handleRightMenuClick}
          className="nav-link p-2 ms-auto"
        >
          <span className="sr-only">Profile Menu Button</span>
          <span className="flex items-center justify-center h-6 w-6">
            <i className="uil uil-heart-rate text-2xl"></i>
          </span>
        </button>
      </header>
    </>
  );
}
