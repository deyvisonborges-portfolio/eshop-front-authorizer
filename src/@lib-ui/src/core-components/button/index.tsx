import React, { ComponentPropsWithRef, forwardRef } from "react";
import styles from "./button.module.css";

type ButtonSize = "mini" | "small" | "medium" | "regular" | "large";
type ButtonVariant = "squared" | "rounded" | "pill";
type ButtonColor = "primary" | "secondary";

type ButtonProps = {
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
} & ComponentPropsWithRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = "primary",
      size = "regular",
      variant = "squared",
      icon,
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
        `}
        {...props}
      >
        <p className={styles["body-large-regular"]}>Body Large Regular</p>
        {icon && <span>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
