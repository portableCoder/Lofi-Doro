import React, { useState } from "react";
import "./Switch.css";
export default function Switch({ onChange }) {
  return (
    <div>
      <label className="switch is-size-5-desktop is-size-6-mobile">
        <input
          onChange={onChange}
          type="checkbox"
          defaultChecked={true}
        ></input>
        <span className="slider round"></span>
        <div style={{ whiteSpace: "nowrap" }} className="pt-2">
          Dark Mode
        </div>
      </label>
    </div>
  );
}
