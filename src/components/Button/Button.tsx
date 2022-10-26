import React from "react";
import { classes } from "../../utils/classes";
import "./Button.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
  const activeClass = props.active ? "Button_active" : undefined;
  return (
    <button
      className={classes(["Button", props.className, activeClass])}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
