import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosConfig from "./axiosConfig";

export const AppContext = createContext({});

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [appData, setAppData] = useState({ header: "" });
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const response = await axiosConfig.get("/api/users/me"
        );
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUser(null);
      } 
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Loadinggggggggggggggggggggggggggggggg...</div>;
  }

  return (
    <AppContext.Provider value={{ appData, setAppData, user, setUser, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
