import React from "react";
import styles from "./tokens.module.css";

type ButtonSize = "mini" | "small" | "medium" | "regular" | "large";
type ButtonVariant = "squared" | "rounded" | "pill";
type ButtonColor = "primary" | "";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "regular",
  variant = "squared",
  icon,
  ...props
}) => {
  return (
    <button
      // corrigir essa parte, pois esta retornando undefined devido a falta do suporte ao prefixo button--
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${
        icon ? styles.withIcon : ""
      }`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
