import { SearchAction } from './constants/search-action';

export interface SearchCommand {
  action: SearchAction;
  parameters: {
    query: string;
    near: string;
    price?: string;
    open_now?: boolean;
  };
}
