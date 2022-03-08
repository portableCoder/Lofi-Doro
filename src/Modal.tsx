import { motion } from "framer-motion";
import React from "react";
import { Theme } from "./ThemeContext";
interface ModalProps {
  open: boolean,
  children?: any,
  title: string,
  handleClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement> | undefined,
  theme: Theme
}
export default function Modal({ open, children, title, handleClose, theme }: ModalProps) {
  const { primaryColor, secondaryColor, textColor } = theme;
  return (
    <div>
      <div className={`modal ${open ? "is-active" : ""}`}>
        <div
          style={{
            color: textColor,
            opacity: "0.7",
          }}
          onClick={handleClose}
          className="modal-background"
        ></div>
        <div
          style={{
            color: textColor,
            border: `1px solid ${textColor}`,
          }}
          className="modal-card"
        >
          <header
            style={{
              background: primaryColor,
              color: textColor,
            }}
            className="modal-card-head"
          >
            <p
              style={{
                color: textColor,
              }}
              className="modal-card-title"
            >
              {title}
            </p>
            <button
              onClick={handleClose}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section
            style={{
              color: textColor,

              background: secondaryColor,
            }}
            className="modal-card-body"
          >
            {children}
          </section>
          <footer style={{ background: primaryColor }} className="modal-card-foot">
            <button
              style={{
                color: textColor,

                background: secondaryColor,
              }}
              className="button"
            >
              Enter
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
