import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.ComponentProps<"div"> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...restProps }, ref) => {
    return (
      <div
        data-slot="skeleton"
        className={cn("bg-accent animate-pulse rounded-md", className)}
        {...restProps}
        ref={ref}
      />
    );
  }
);

export { Skeleton };
