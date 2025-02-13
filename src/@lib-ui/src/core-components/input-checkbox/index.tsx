import styles from "./input-checkbox.module.css";
import { ComponentPropsWithRef, forwardRef, memo } from "react";

interface InputCheckboxProps extends ComponentPropsWithRef<"input"> {
  label?: string;
  checkboxSize?: "small" | "regular";
}

export const InputCheckbox = memo(
  forwardRef<HTMLInputElement, InputCheckboxProps>(
    ({ label, checkboxSize = "regular", disabled, ...props }, ref) => {
      return (
        <label
          className={[
            styles.container,
            disabled && styles[`label--disabled`],
          ].join(" ")}
        >
          <input
            {...props}
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className={[styles.input, styles[`size-${checkboxSize}`]].join(" ")}
          />
          {label && (
            <span
              className={[
                styles.label,
                disabled && styles[`label--disabled`],
              ].join(" ")}
            >
              {label}
            </span>
          )}
        </label>
      );
    }
  )
);

InputCheckbox.displayName = "InputCheckbox";
