'use client'

import { useTheme } from "@/styles/theme.provider";
import styles from "./styles.module.css";

export const Button = () => {
  const { toggleTheme } = useTheme();
  return (
    <button className={styles.button} onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
};
