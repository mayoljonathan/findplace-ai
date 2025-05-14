export const SEARCH_ACTIONS = {
  restaurant_search: 'restaurant_search',
} as const;

export const SEARCH_ACTION_TO_FOURSQUARE_CATEGORY_ID = {
  [SEARCH_ACTIONS.restaurant_search]: '4d4b7105d754a06374d81259',
} as const;

export type SearchAction = keyof typeof SEARCH_ACTIONS;
