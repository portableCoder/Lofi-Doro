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
    primaryColor: "#C00D0D",
    secondaryColor: "#FCF6F5FF",
    textColor: "white",
    timerColor: "white",
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
