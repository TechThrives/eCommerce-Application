import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "./axiosConfig";

export const AppContext = createContext({});

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [appData, setAppData] = useState({ header: "" });
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axiosConfig.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`
      );

      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return <div>Loadinggggggggggggggggggggggggggggggg...</div>;
  }

  return (
    <AppContext.Provider value={{ appData, setAppData, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
