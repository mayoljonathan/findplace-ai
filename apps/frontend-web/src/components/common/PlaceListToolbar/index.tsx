import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "../../base";
import { cn } from "../../../lib/utils";

const SORT_BY_OPTIONS = [
  { label: "Default", value: "relevance" },
  { label: "Price (low to high)", value: "price-asc" },
  { label: "Price (high to low)", value: "price-desc" },
  { label: "Rating (low to high)", value: "rating-asc" },
  { label: "Rating (high to low)", value: "rating-desc" },
] as const;

type SortBy = (typeof SORT_BY_OPTIONS)[number]["value"];

interface PlaceListToolbarProps {
  itemCount?: number;
  sortBy?: SortBy;
  onSortByChange?: (value: SortBy) => void;
  isLoading?: boolean;
  className?: string;
}

export const PlaceListToolbar: React.FC<PlaceListToolbarProps> = (props) => {
  const {
    className,
    itemCount,
    sortBy = "relevance",
    onSortByChange,
    isLoading,
  } = props;

  return (
    <div
      className={cn(
        "flex items-center flex-wrap justify-between gap-2",
        className
      )}
    >
      {isLoading ? (
        <Skeleton className="h-4 w-24" />
      ) : (
        <span className="text-muted-foreground text-sm">
          {itemCount} result(s) found
        </span>
      )}

      {isLoading ? (
        <Skeleton className="h-9 w-24" />
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-sm">Sort by</span>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {SORT_BY_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

PlaceListToolbar.displayName = "PlaceListToolbar";
