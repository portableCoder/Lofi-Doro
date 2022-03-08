import React, { useContext } from "react";
import Switch from "./Switch";
import { Theme, ThemeContext } from "./ThemeContext";

export default function Header() {
  const themeContext = useContext(ThemeContext);
  const { primaryColor, secondaryColor, textColor } = themeContext.theme
  return (
    <div
      style={{
        textAlign: "center",
        background: primaryColor,
        color: textColor,
      }}
      className="notification header is-size-1-desktop is-size-3-mobile is-flex is-justify-content-space-between"
    >
      <Switch
        onChange={(e) => {
          if (themeContext && themeContext.setTheme) {
            if (e.target.checked === false) {
              themeContext.setTheme("light");
            } else {
              themeContext.setTheme("dark");
            }
          }
        }}
      ></Switch>
      Lofi Doro
      <div style={{ color: primaryColor }}>f</div>
    </div>
  );
}
