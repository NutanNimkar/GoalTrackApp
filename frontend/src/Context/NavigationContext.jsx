import React, { createContext, useState, useContext } from 'react';

// Create context
const NavigationContext = createContext();

// Provider component
export const NavigationProvider = ({ children }) => {
  const [closeMenu, setCloseMenu] = useState(false);

  return (
    <NavigationContext.Provider value={{ closeMenu, setCloseMenu }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to use context
export const useNavigation = () => {
  return useContext(NavigationContext);
};
