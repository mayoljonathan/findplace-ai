import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const containerVariants = cva(
  "container transition-all h-auto min-h-full m-auto p-4",
  {
    variants: {
      maxWidth: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md ",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
      },
    },
    defaultVariants: {
      maxWidth: "lg",
    },
  }
);

interface ContainerProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    VariantProps<typeof containerVariants> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const Container: React.FC<ContainerProps> = (props) => {
  const { className, maxWidth, children, ...restProps } = props;

  return (
    <div
      className={cn(containerVariants({ maxWidth, className }))}
      {...restProps}
    >
      {children}
    </div>
  );
};
