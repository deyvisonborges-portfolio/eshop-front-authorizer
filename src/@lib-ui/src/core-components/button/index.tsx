import React, { ComponentPropsWithRef, forwardRef } from "react";
import styles from "./button.module.css";

export type ButtonSize = "mini" | "small" | "medium" | "regular" | "large";
export type ButtonVariant = "squared" | "rounded" | "pill";
export type ButtonColor = "primary" | "secondary" | "";

type ButtonProps = {
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  isFull?: boolean;
} & ComponentPropsWithRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = "primary",
      size = "regular",
      variant = "squared",
      icon,
      className,
      isFull,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        name="button"
        type="button"
        className={`
          ${styles.button} 
          ${styles[`button--${color}`]}
          ${styles[`button--${size}`]} 
          ${styles[`button--${variant}`]} 
          ${icon ? styles.withIcon : ""}
          ${isFull && styles.full}
          ${className || ""}
        `.trim()}
        {...props}
      >
        {icon && <span>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
