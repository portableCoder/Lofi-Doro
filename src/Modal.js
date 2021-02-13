import { motion } from "framer-motion";
import React from "react";

export default function Modal({ open, children, title, handleClose, theme }) {
  const { primaryColor, secondaryColor, textColor } = theme;
  return (
    <div>
      <div class={`modal ${open ? "is-active" : ""}`}>
        <div
          style={{
            color: textColor,
            opacity: "0.7",
          }}
          onClick={handleClose}
          class="modal-background"
        ></div>
        <div
          style={{
            color: textColor,
            border: `1px solid ${textColor}`,
          }}
          class="modal-card"
        >
          <header
            style={{
              background: primaryColor,
              color: textColor,
            }}
            class="modal-card-head"
          >
            <p
              style={{
                color: textColor,
              }}
              class="modal-card-title"
            >
              {title}
            </p>
            <button
              onClick={handleClose}
              class="delete"
              aria-label="close"
            ></button>
          </header>
          <section
            style={{
              color: textColor,

              background: secondaryColor,
            }}
            class="modal-card-body"
          >
            {children}
          </section>
          <footer style={{ background: primaryColor }} class="modal-card-foot">
            <button
              style={{
                color: textColor,

                background: secondaryColor,
              }}
              class="button"
            >
              Enter
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
