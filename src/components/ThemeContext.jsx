import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Global theme styles
  const themeStyles = {
    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  // Special styles for navbar and transparent sections
  const transparentSectionStyle = {
    backgroundColor: 'transparent',
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, themeStyles, transparentSectionStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
