"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

interface TooltipProps extends React.PropsWithChildren {
  tooltip?: string | React.ReactNode;
  triggerProps?: React.ComponentProps<typeof TooltipPrimitive.Trigger>;
  contentProps?: React.ComponentProps<typeof TooltipPrimitive.Content>;
  rootProps?: React.ComponentProps<typeof TooltipPrimitive.Root>;
}

export const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps
>(({ children, tooltip, triggerProps, contentProps, rootProps }, ref) => {
  if (!tooltip) return <>{children}</>;

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={250} {...rootProps}>
        <TooltipPrimitive.Trigger type="button" asChild {...triggerProps}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={ref}
            {...contentProps}
            className={cn(
              "z-50 overflow-hidden rounded-md bg-foreground px-3 py-1.5 text-sm text-background shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
              contentProps?.className
            )}
          >
            {tooltip}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
});

Tooltip.displayName = "Tooltip";
