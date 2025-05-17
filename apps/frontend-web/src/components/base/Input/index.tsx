import * as React from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface InputProps extends React.ComponentProps<"input"> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, iconLeft, iconRight, ...restProps } = props;

  return (
    <div
      className={cn(
        "w-full flex items-center h-10",
        "shadow-xs transition-[color,box-shadow]",
        "border border-input rounded-md relative focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
      )}
    >
      {iconLeft && (
        <Slot className="ml-3 size-4 text-muted-foreground">{iconLeft}</Slot>
      )}
      <input
        data-slot="input"
        className={cn(
          "!h-full mr-1 text-base file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 bg-transparent pl-3 pr-1.5 py-1 file:inline-flex file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 outline-none",
          className
        )}
        {...restProps}
        ref={ref}
      />
    </div>
  );
});

export { Input };
