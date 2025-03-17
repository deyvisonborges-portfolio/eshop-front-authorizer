import styles from "./spinner.module.css"

type SpinnerProps = {
  color?: "red" | "blue" | "green"
  size?: "small" | "regular" | "medium"
}

export function Spinner({ size = "regular", color }: SpinnerProps) {
  return (
    <i
      data-color={color} // Define um atributo para ser usado no CSS
      className={[styles[`loader--${size}`], styles.loader].join(" ")}
    ></i>
  )
}
