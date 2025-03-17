import styles from "./text.module.css"
import { ComponentPropsWithRef, createElement, forwardRef } from "react"
// import { getClassNames } from "../../utils";

type Size = "large" | "regular" | "medium" | "small" | "mini"
type Weight = "regular" | "medium" | "bold"
type Style = "normal" | "link" | "uppercase"

type TextProps = {
  size?: Size
  weight?: Weight
  decoration?: Style
  type?: "span" | "p"
  //ISSUE: aplicar tokens semanticos de componentes
  // token?: "body-large-regular";
  // classNames?: Record<string, string>;
} & ComponentPropsWithRef<"span" | "p">

type RefProps = HTMLSpanElement | HTMLParagraphElement

export const Text = forwardRef<RefProps, TextProps>(
  (
    {
      children,
      size = "regular",
      weight = "regular",
      decoration = "normal",
      type = "p",
      className,
      // token,
      ...props
    },
    ref
  ) => {
    const TextElement = type
    // className: getClassNames(classNames);
    return createElement(
      TextElement,
      {
        ...props,
        ref,
        // ${styles[`${token}`]}
        className: `
          ${styles[`size-${size}`]}
          ${styles[`weight-${weight}`]}
          ${styles[`style-${decoration}`]},
          ${className}
        `,
      },
      children
    )
  }
)

Text.displayName = "Text"
