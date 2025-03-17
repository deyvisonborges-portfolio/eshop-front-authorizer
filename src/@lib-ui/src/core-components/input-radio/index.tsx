import styles from "./input-radio.module.css"
import {
  ChangeEvent,
  ComponentPropsWithRef,
  forwardRef,
  useCallback,
} from "react"

type InputRadioProps = {
  label?: string
  radioSize?: "small" | "regular"
  isChecked?: boolean
  toggleChecked: (value: boolean) => void
} & ComponentPropsWithRef<"input">

export const InputRadio = forwardRef<HTMLInputElement, InputRadioProps>(
  ({ label, radioSize, disabled, isChecked, toggleChecked, ...props }, ref) => {
    const handleOnChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        toggleChecked(event.target.checked)
      },
      [toggleChecked]
    )

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
          type="radio"
          disabled={disabled}
          className={[styles.input, styles[`size-${radioSize}`]].join(" ")}
          checked={isChecked}
          onChange={handleOnChange}
        />
        {label && (
          <p
            className={[
              styles.label,
              disabled && styles[`label--disabled`],
            ].join(" ")}
          >
            {label}
          </p>
        )}
      </label>
    )
  }
)
