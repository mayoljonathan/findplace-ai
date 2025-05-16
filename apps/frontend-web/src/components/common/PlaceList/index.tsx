import React, { ComponentPropsWithoutRef } from "react";
import { FoursquarePlace } from "../../../types";
import { PlaceListItem } from "./PlaceListItem";

interface PlaceListProps
  extends ComponentPropsWithoutRef<typeof PlaceListItem> {
  items?: FoursquarePlace[];
}

const PLACE_LIST_SKELETON_COUNT = 8;
const skeletonItems = new Array(PLACE_LIST_SKELETON_COUNT).fill(0);

export const PlaceList: React.FC<PlaceListProps> = (props) => {
  const { items = [], isLoading = false, ...restProps } = props;

  return (
    <ul className="space-y-4">
      {isLoading
        ? skeletonItems.map((_, index) => (
            <li key={index}>
              <PlaceListItem isLoading {...restProps} />
            </li>
          ))
        : items.map((item) => (
            <li key={item.fsq_id}>
              <PlaceListItem item={item} {...restProps} />
            </li>
          ))}
    </ul>
  );
};

PlaceList.displayName = "PlaceList";
