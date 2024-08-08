import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAppContext();

  return user ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
