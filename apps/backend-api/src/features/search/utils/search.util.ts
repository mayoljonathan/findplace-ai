import { SearchCommand } from '../types';

export function getInterfaceSchema<T>(example: T): string {
  return JSON.stringify(example, null, 2);
}

export const searchCommandInterfaceExample = `
  interface SearchCommand {
    action: string;
    parameters: {
      query: string;
      near: string;
      price?: string;
      open_now?: boolean;
    };
  }
`;

export const restaurantSearchCommandExample = getInterfaceSchema<SearchCommand>(
  {
    action: 'restaurant_search',
    parameters: {
      query: 'sushi',
      near: 'downtown Los Angeles',
      price: '1',
      open_now: true,
    },
  },
);
