import { ComponentPropsWithRef, forwardRef, PropsWithChildren } from "react";

type FormProps = {
  utilities?: string[];
} & ComponentPropsWithRef<"form"> &
  PropsWithChildren;

// export function mapUtilities(utilities: string[]): string[] {
//   if (!Array.isArray(utilities)) return [];
//   return utilities.map((utility) => {
//     console.log(mapUtilities.name, utility);
//     return "";
//   });
// }

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, utilities, ...props }, ref) => {
    console.log(utilities);

    return (
      <form ref={ref} {...props} className={utilities?.join(" ")}>
        {children}
      </form>
    );
  }
);

Form.displayName = "Form";
