import React from "react";

export const AppContext = React.createContext({});

export function AppProvider({ children }) {
  const [appData, setAppData] = React.useState({ header: "" });
  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return React.useContext(AppContext);
};
