import { FoursquarePlace } from '../../../services/foursquare/types';

export const SEARCH_ACTIONS = {
  restaurant_search: 'restaurant_search',
  arts_and_entertainment_search: 'arts_and_entertainment_search',
  business_and_professional_services_search:
    'business_and_professional_services_search',
  community_and_government_search: 'community_and_government_search',
  dining_and_drinking_search: 'dining_and_drinking_search',
  event_search: 'event_search',
  health_and_medicine_search: 'health_and_medicine_search',
  landmarks_and_outdoors_search: 'landmarks_and_outdoors_search',
  nightlife_spot_search: 'nightlife_spot_search',
  retail_search: 'retail_search',
  sports_and_recreation_search: 'sports_and_recreation_search',
  travel_and_transportation_search: 'travel_and_transportation_search',
} as const;

export type SearchAction = keyof typeof SEARCH_ACTIONS;

// Documentation for categories
//https://docs.foursquare.com/data-products/docs/categories
export const SEARCH_ACTION_TO_FOURSQUARE_CATEGORY_ID: Record<
  SearchAction,
  string
> = {
  [SEARCH_ACTIONS.restaurant_search]: '4d4b7105d754a06374d81259',
  [SEARCH_ACTIONS.arts_and_entertainment_search]: '4d4b7104d754a06370d81259',
  [SEARCH_ACTIONS.business_and_professional_services_search]:
    '4d4b7105d754a06375d81259',
  [SEARCH_ACTIONS.community_and_government_search]: '63be6904847c3692a84b9b9a',
  [SEARCH_ACTIONS.dining_and_drinking_search]: '63be6904847c3692a84b9bb5',
  [SEARCH_ACTIONS.event_search]: '4d4b7105d754a06373d81259',
  [SEARCH_ACTIONS.health_and_medicine_search]: '63be6904847c3692a84b9bb9',
  [SEARCH_ACTIONS.landmarks_and_outdoors_search]: '4d4b7105d754a06377d81259',
  [SEARCH_ACTIONS.nightlife_spot_search]: '4d4b7105d754a06376d81259',
  [SEARCH_ACTIONS.retail_search]: '4d4b7105d754a06378d81259',
  [SEARCH_ACTIONS.sports_and_recreation_search]: '4f4528bc4b90abdf24c9de85',
  [SEARCH_ACTIONS.travel_and_transportation_search]: '4d4b7105d754a06379d81259',
} as const;

export const SEARCH_FOURSQUARE_PLACE_FIELDS: (keyof FoursquarePlace)[] = [
  'fsq_id',
  'name',
  'categories',
  'location',
  'photos',
  'rating',
  'price',
  'popularity',
  'hours',
  'website',
  'tel',
];
