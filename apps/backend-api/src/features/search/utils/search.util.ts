import { SearchCommand } from '../types';

function getInterfaceSchema<T>(example: T): string {
  return JSON.stringify(example, null, 2);
}

export const searchCommandInterfaceExample = `
  interface SearchCommand {
    action: string;
    parameters: {
      query: string;
      near?: string;
      price?: string; // "1" (most affordable) to "4" (most expensive)
      open_now?: boolean; // "open_now" cannot be used together with "open_at"
      open_at?: string; // Format is DOWTHHMM (e.g., 1T2130), where DOW is the day number 1-7 (Monday = 1, Sunday = 7) and time is in 24 hour format
    };
  }
`;

export const restaurantSearchCommandExample = {
  message:
    "Find me a cheap sushi restaurant in downtown Los Angeles that's open now and has at least a 4-star rating.",
  output: getInterfaceSchema<SearchCommand>({
    action: 'restaurant_search',
    parameters: {
      query: 'sushi',
      near: 'downtown Los Angeles',
      price: '1',
      open_now: true,
      open_at: null,
    },
  }),
};

export const sportsAndRecreationSearchCommandExample = {
  message: 'Tennis court in Cebu City',
  output: getInterfaceSchema<SearchCommand>({
    action: 'sports_and_recreation_search',
    parameters: {
      query: 'Tennis court',
      near: 'Cebu City',
      price: null,
      open_now: null,
      open_at: null,
    },
  }),
};
