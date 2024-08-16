import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import Loader from "../Components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAppContext();

  return isLoading ? <><Loader /></> : user ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
