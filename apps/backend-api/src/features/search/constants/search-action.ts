export const SEARCH_ACTIONS = {
  restaurant_search: 'restaurant_search',
} as const;

export type SearchAction = keyof typeof SEARCH_ACTIONS;
