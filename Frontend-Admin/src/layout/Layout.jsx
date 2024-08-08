import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";
import RightMenu from "./RightMenu";
import PrivateRoute from "../utils/PrivateRoute";

export default function Layout() {
  return (
    <>
      <PrivateRoute>
        <div className="app-wrapper">
          <Sidebar />

          <div className="app-content">
            <Header />

            <main className="p-6">
              <Outlet />
            </main>
            <Footer />
          </div>

          <RightMenu />
        </div>
      </PrivateRoute>
    </>
  );
}
