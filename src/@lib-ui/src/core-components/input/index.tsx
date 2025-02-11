"use client";

import { ComponentPropsWithRef, forwardRef, useMemo, useState } from "react";
import { Text } from "../text";
import Image from "next/image";

type InputType = "text" | "password" | "email";
type InputProps = {
  name: string;
  label?: string;
  type?: InputType;
  variant?: "default" | "underline";
  customMessage?: string;
  has?: { 
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
    { name, type, variant, label, customMessage, required, has, ...props },
    ref
  ) => {
    const [hasEyeIcon, setEyeIcon] = useState<boolean>(true);

    if (type === "password") {
      has = {
        eyeIcon: true,
      };
    }

    const renderIcon = () =>
      useMemo(() => {
        if (type === "password") {
          return (
            <Image
              alt="Password input eye icon"
              height={20}
              onClick={() => setEyeIcon(!hasEyeIcon)}
              src={`/svgs/eye-${hasEyeIcon ? "close" : "open"}-black-16.svg`}
              width={20}
            />
          );
        }
      }, []);

    return (
      <div id="container">
        {label && (
          <label id="input-label" htmlFor={name}>
            {label}
          </label>
        )}

        <div id="input-wrapper">
          <input
            {...props}
            ref={ref}
            id={name}
            name={name}
            type={type}
            required={required}
            placeholder={type ? renderPlaceholderTypeText[type] : ""}
          />

          {renderIcon()}
        </div>

        {customMessage && <Text>{customMessage}</Text>}
      </div>
    );
  }
);

Input.displayName = "Input";
