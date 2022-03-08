import React, { useState } from "react";
export type Theme = {
  primaryColor: string,
  secondaryColor: string,
  textColor: string,
  timerColor: string,
}

const darkTheme: Theme = {
  primaryColor: "#202225",
  secondaryColor: "#36393f",
  textColor: "white",
  timerColor: "#B9253A",
};
const lightTheme: Theme = {
  primaryColor: "#C00D0D",
  secondaryColor: "#FCF6F5FF",
  textColor: "white",
  timerColor: "white",
};

interface ThemeContextProps {
  theme: Theme,
  setTheme?: React.Dispatch<React.SetStateAction<string>>
}
const ThemeContext = React.createContext<ThemeContextProps>({
  theme: darkTheme


});
interface ThemeProviderProps {
  children: any
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {

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
