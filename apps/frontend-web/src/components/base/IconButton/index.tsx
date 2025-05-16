import React, { ComponentProps, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { Tooltip } from "../Tooltip";
import { Loader } from "../Loader";
import { cn } from "../../../lib/utils";

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof iconButtonVariants>,
    Pick<ComponentProps<typeof Tooltip>, "tooltip"> {
  isLoading?: boolean;
}

export const iconButtonVariants = cva(
  "relative transition-all flex justify-center items-center rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "w-6 h-6 min-w-[1.5rem]", // 24
        md: "w-8 h-8 min-w-[2rem]", // 32,
        lg: "w-10 h-10 min-w-[2.5rem]", // 40
      },
      radius: {
        none: "rounded-none",
        md: "rounded-md",
        full: "rounded-full",
      },
      variant: {
        ghost: "hover:bg-accent active:ring-accent/50",
        contained: "",
        outline: "border",
      },
      color: {
        primary: "",
      },
    },
    defaultVariants: {
      size: "md",
      radius: "full",
      variant: "ghost",
      color: "primary",
    },
    compoundVariants: [
      {
        color: "primary",
        variant: "contained",
        className: "bg-primary text-primary-foreground hover:bg-primary/80",
      },
      {
        color: "primary",
        variant: "outline",
        className: "hover:bg-primary/20 border-primary text-primary",
      },
      {
        color: "primary",
        variant: "ghost",
        className: "text-primary",
      },
    ],
  }
);

const iconSize: Record<NonNullable<IconButtonProps["size"]>, number> = {
  sm: 16,
  md: 18,
  lg: 24,
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      type = "button",
      className,
      children,
      size = "md",
      color,
      radius,
      variant,
      tooltip,
      isLoading = false,
      disabled,
      ...restProps
    } = props;

    return (
      <Tooltip tooltip={tooltip}>
        <button
          type={type}
          ref={ref}
          disabled={isLoading || disabled}
          className={cn(
            iconButtonVariants({
              className,
              size,
              radius,
              variant,
              color,
            }),
            {
              "disabled:opacity-100": isLoading,
            }
          )}
          {...restProps}
        >
          {props["aria-label"] && (
            <span className="sr-only">{props["aria-label"]}</span>
          )}
          <Slot
            style={{
              height: iconSize[size as keyof typeof iconSize],
              width: iconSize[size as keyof typeof iconSize],
            }}
          >
            {isLoading ? <Loader /> : children}
          </Slot>
        </button>
      </Tooltip>
    );
  }
);

IconButton.displayName = "IconButton";
