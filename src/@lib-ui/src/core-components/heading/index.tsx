import styles from "./heading.module.css"
import { ComponentPropsWithRef, createElement, forwardRef } from "react"

type Formatting = "normal" | "link" | "uppercase"
type Size = "xxlarge" | "xlarge" | "large" | "medium" | "small" | "xsmall"
type Weight = "regular" | "medium" | "bold"
type Headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type HeadingProps = {
  as: Headings
  formatting?: Formatting
  size?: Size
  weight?: Weight
} & ComponentPropsWithRef<Headings>

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as,
      children,
      formatting = "normal",
      weight = "regular",
      className,
      size,
      ...props
    },
    ref
  ) => {
    const El = as

    const classNames = [
      size && styles[`size-${size}`],
      styles[`weight-${weight}`],
      styles[`formatting-${formatting}`],
      className,
    ]
      .filter(Boolean)
      .join(" ")

    return createElement(El, {
      ...props,
      ref,
      className: classNames,
      children,
    })
  }
)

Heading.displayName = "Heading"
