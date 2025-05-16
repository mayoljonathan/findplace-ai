import React from "react";
import { cn } from "../../../lib/utils";
import { APP_HERO_TAGLINE } from "../../../config/constants";

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = (props) => {
  const { className } = props;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-8",
        className
      )}
    >
      <h1 className="text-2xl sm:text-4xl text-center">{APP_HERO_TAGLINE}</h1>
    </div>
  );
};

Hero.displayName = "Hero";
