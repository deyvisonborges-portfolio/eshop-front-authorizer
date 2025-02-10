import React, { PropsWithChildren, ReactElement } from "react";

export type BaseComponentProps = {
  classNames?: Record<string, string>;
  utilities?: string[];
} & PropsWithChildren;

const Func = ({ children, classNames, utilities }: BaseComponentProps) => {};

export function withBaseProps(element: ReactElement) {
  const clone = React.cloneElement(element, {
    
  });
}
