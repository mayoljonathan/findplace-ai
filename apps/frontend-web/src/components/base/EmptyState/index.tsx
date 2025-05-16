import React from "react";
import Image from "next/image";
import { cn } from "../../../lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface EmptyStateProps {
  className?: string;
  image?: React.ReactNode;
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = (props) => {
  const { className, image, title, description } = props;

  return (
    <div
      className={cn(
        "m-auto flex h-auto max-w-lg flex-col items-center justify-center text-center",
        className
      )}
    >
      {image && (
        <div className="mb-2">
          {React.isValidElement(image) ? (
            <Slot className="size-60">{image}</Slot>
          ) : (
            <Image
              alt={title ?? ""}
              src={image as string}
              width={240}
              height={240}
              className="size-60"
            />
          )}
        </div>
      )}
      {title && <p className="text-lg font-semibold">{title}</p>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

EmptyState.displayName = "EmptyState";
