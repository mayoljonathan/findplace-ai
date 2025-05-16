import { SearchAction } from './constants/search';

export interface SearchCommand {
  action: SearchAction;
  parameters: {
    query: string;
    near?: string;
    price?: string; // "1" (most affordable) to "4" (most expensive)
    open_now?: boolean; // "open_now" cannot be used together with "open_at"
    open_at?: string; // Format is DOWTHHMM (e.g., 1T2130), where DOW is the day number 1-7 (Monday = 1, Sunday = 7) and time is in 24 hour format
  };
}
