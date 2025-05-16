import React from "react";
import Image from "next/image";
import { LucideStar } from "lucide-react";
import { FoursquarePlace } from "../../../types";
import { Badge } from "../../base";
import { PriceLevel } from "../PriceLevel";
import { useMediaQuery } from "usehooks-ts";

const ACTUAL_MAX_RATING = 10;
const DESIRED_MAX_RATING = 5;
const RATING_SCALE_FACTOR = DESIRED_MAX_RATING / ACTUAL_MAX_RATING;

interface PlaceListItemProps {
  item: FoursquarePlace;
}

export const PlaceListItem: React.FC<PlaceListItemProps> = ({ item }) => {
  const { name, categories, location, photos, rating, price, hours } = item;

  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const thumbnailImageSize = !isSmallScreen ? "300x300" : "600x338";

  const thumbnail = photos?.[0]
    ? `${photos[0].prefix}${thumbnailImageSize}${photos[0].suffix}`
    : "/images/placeholder.jpg";

  const scaledRating =
    rating === undefined ? undefined : rating * RATING_SCALE_FACTOR;

  return (
    <div className="flex sm:flex-row flex-col gap-2 sm:gap-3">
      <div className="rounded-md aspect-square min-w-fit h-48 sm:h-32 relative overflow-hidden">
        <Image
          alt={name}
          src={thumbnail}
          fill
          className="rounded-md object-cover"
        />
        {!hours.open_now && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            <span className="text-sm font-bold">Closed</span>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm text-muted-foreground">
          {location.formatted_address}
        </p>
        {(!!rating || !!price) && (
          <div className="mt-1 flex items-center gap-4">
            {!!rating && (
              <div className="flex items-center gap-1">
                <LucideStar
                  className="text-yellow-400 fill-yellow-400"
                  size={16}
                />
                <span className="text-sm">{scaledRating}</span>
              </div>
            )}
            {!!price && <PriceLevel value={price} />}
          </div>
        )}
        <div className="mt-1 flex flex-wrap gap-1">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant="outline"
              className="flex gap-2 pl-1"
            >
              <Image
                alt={category.short_name}
                src={`${category.icon.prefix}bg_32${category.icon.suffix}`}
                width={18}
                height={18}
              />
              {category.short_name}
            </Badge>
          ))}
        </div>

        {hours.display && (
          <div className="mt-1">
            <span className="text-xs text-muted-foreground">
              {hours.display}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

PlaceListItem.displayName = "PlaceListItem";
