import React from "react";
import { cn } from "../../../lib/utils";

interface PriceLevelProps {
  minPrice?: number;
  maxPrice?: number;
  value: number;
}

export const PriceLevel: React.FC<PriceLevelProps> = (props) => {
  const { minPrice = 1, maxPrice = 4, value = 0 } = props;

  const priceLevels = Array.from(
    { length: maxPrice - minPrice + 1 },
    (_, i) => minPrice + i
  );

  return (
    <ul className="flex">
      {priceLevels.map((priceLevel) => (
        <li
          key={priceLevel}
          className={cn("text-sm", {
            "text-foreground": priceLevel <= value,
            "text-muted-foreground/50": priceLevel > value,
          })}
        >
          $
        </li>
      ))}
    </ul>
  );
};

PriceLevel.displayName = "PriceLevel";
