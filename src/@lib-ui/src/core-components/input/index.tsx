"use client";

import styles from "./input.module.css";

import { ComponentPropsWithRef, forwardRef, useMemo, useState } from "react";

type InputSize = "small" | "regular" | "full";
type InputType = "text" | "password" | "email";
type InputProps = {
  name: string;
  zsize?: InputSize;
  label?: string;
  type?: InputType;
  variant?: "default" | "underline";
  customMessage?: string;
  has?: {
    error?: boolean;
    eyeIcon?: boolean;
  };
} & ComponentPropsWithRef<"input">;

const renderPlaceholderTypeText: Record<InputType, string> = {
  text: "Digite aqui sua senha",
  password: "Informe sua senha",
  email: "Digite aqui seu e-mail",
} as const;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      zsize = "regular",
      name,
      type,
      variant,
      label,
      customMessage,
      required,
      has,
      ...props
    },
    ref
  ) => {
    const [isInvalid, setIsInvalid] = useState(false);

    const renderCustomMessage = () => {
      return (
        customMessage && (
          <p
            className={[
              styles["input-message"],
              has?.error && styles["input-message-error"],
            ].join(" ")}
          >
            {customMessage}
          </p>
        )
      );
    };

    return (
      <div className={styles["input-wrapper"]}>
        <div className={[styles.label, styles["input-container"]].join(" ")}>
          {label && (
            <label
              id="input-label"
              htmlFor={name}
              className={`${styles[`label-size-${zsize}`]}`}
            >
              {label}
            </label>
          )}

          <div>
            <input
              className={[
                styles.input,
                styles[`size-${zsize}`],
                (has?.error || isInvalid) && styles["input-error"],
              ].join(" ")}
              {...props}
              ref={ref}
              id={name}
              name={name}
              type={type}
              required={required}
              placeholder={type ? renderPlaceholderTypeText[type] : ""}
              onBlur={(e) => setIsInvalid(!e.target.validity.valid)}
              onFocus={(e) => setIsInvalid(!e.target.validity.valid)}
            />
          </div>
        </div>

        {renderCustomMessage()}
      </div>
    );
  }
);

Input.displayName = "Input";
