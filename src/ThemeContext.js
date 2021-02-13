import React, { useState } from "react";
const ThemeContext = React.createContext({});

const ThemeProvider = ({ children }) => {
  const darkTheme = {
    primaryColor: "#202225",
    secondaryColor: "#36393f",
    textColor: "white",
    timerColor: "#B9253A",
  };
  const lightTheme = {
    primaryColor: "#556EE6",
    secondaryColor: "#778BEB",
    textColor: "white",
    timerColor: "#D13148",
  };
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider
      value={{
        theme: theme === "dark" ? darkTheme : lightTheme,
        setTheme: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
