import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <>
      <ToastContainer />
      <Header />
      {<Outlet />}
      <Footer />
    </>
  );
}
