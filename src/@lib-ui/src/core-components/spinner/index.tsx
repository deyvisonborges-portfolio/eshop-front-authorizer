import styles from "./spinner.module.css";

type SpinnerProps = {
  size?: "small" | "regular" | "medium";
};

export function Spinner({ size = "regular" }: SpinnerProps) {
  return (
    <i className={[styles[`loader--${size}`], styles.loader].join(" ")}></i>
  );
}
