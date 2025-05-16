export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface FoursquarePlaceTip {
  id: string;
  created_at: Date;
  text: string;
  url: string;
  photo?: string;
  lang: string;
  agree_count: number;
  disagree_count: number;
}

export interface FoursquarePlaceHour {
  close: string;
  day: number;
  open: string;
}

export interface FoursquarePlace {
  fsq_id: string;
  categories: {
    id: number;
    name: string;
    short_name: string;
    plural_name: string;
    icon: {
      prefix: string;
      suffix: string;
    };
  }[];
  chains: {
    id: string;
    name: string;
  }[];
  closed_bucket: string;
  date_closed: string;
  description: string;
  distance: number;
  email: string;
  fax: string;
  geocodes: Partial<{
    drop_off: Coordinate;
    front_door: Coordinate;
    main: Coordinate;
    road: Coordinate;
    roof: Coordinate;
  }>;
  hours: {
    display: string;
    is_local_holiday: boolean;
    open_now: boolean;
    regular: FoursquarePlaceHour[];
  };
  hours_popular: FoursquarePlaceHour[];
  link: string;
  location: Partial<{
    address: string;
    address_extended: string;
    admin_region: string;
    census_block: string;
    country: string;
    cross_street: string;
    dma: string;
    formatted_address: string;
    locality: string;
    neighborhood: string[];
    po_box: string;
    post_town: string;
    postcode: string;
    region: string;
  }>;
  menu: string;
  name: string;
  photos: {
    id: string;
    created_at: Date;
    prefix: string;
    suffix: string;
    width: number;
    height: number;
    classifications: string[];
    tip: Omit<FoursquarePlaceTip, "photo">;
  }[];
  popularity: number;
  price: number;
  rating: number;
  related_places: Partial<{
    parent: string;
  }>;
  social_media: {
    facebook_id: string;
    instagram: string;
    twitter: string;
  };
  stats: {
    total_photos: number;
    total_ratings: number;
    total_tips: number;
  };
  store_id: string;
  tastes: string[];
  tel: string;
  timezone: string;
  tips: FoursquarePlaceTip[];
  venue_reality_bucket: string;
  verified: boolean;
  website: string;
}
