import React from "react";
import Switch from "./Switch";

export default function Header({ theme }) {
  const { primaryColor, secondaryColor, textColor } = theme.theme;
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
          if (e.target.checked === false) {
            theme.setTheme("light");
          } else {
            theme.setTheme("dark");
          }
        }}
      ></Switch>
      Lofi Doro
      <div style={{ color: primaryColor }}>f</div>
    </div>
  );
}
