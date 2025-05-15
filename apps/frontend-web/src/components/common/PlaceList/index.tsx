import React from "react";
import { FoursquarePlace } from "../../../types";
import { PlaceListItem } from "./PlaceListItem";

interface PlaceListProps {
  items?: FoursquarePlace[];
}

export const PlaceList: React.FC<PlaceListProps> = (props) => {
  const { items = [] } = props;

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.fsq_id}>
          <PlaceListItem item={item} />
        </li>
      ))}
    </ul>
  );
};

PlaceList.displayName = "PlaceList";
