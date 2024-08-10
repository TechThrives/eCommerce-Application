import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAppContext();

  return isLoading ? <div>Loadinggggg...</div> : user ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
