/**
 * @context ThemeContext.js
 * @description This context provides the theme state and a function to toggle the theme. The theme can be either 'light' or 'dark'. The default theme is 'light'. The site uses tailwind css and the theme is applied by adding the 'dark' class to the body as "dark:<changed class-value>"
 */

import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};