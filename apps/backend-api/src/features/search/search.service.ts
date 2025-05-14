import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CONVERT_MESSAGE_TO_SEARCH_COMMAND_SYSTEM_PROMPT } from '../../services/open-ai/constants/prompts';
import { OpenAiService } from '../../services/open-ai/open-ai.service';
import { SearchCommand } from './types';
import { FoursquareService } from '../../services/foursquare/foursquare.service';
import { SEARCH_ACTION_TO_FOURSQUARE_CATEGORY_ID } from './constants/search-action';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    private readonly openAiService: OpenAiService,
    private readonly foursquareService: FoursquareService,
  ) {}

  async search(message: string) {
    const searchCommand =
      await this.openAiService.createChatCompletion<SearchCommand>({
        systemPrompt: CONVERT_MESSAGE_TO_SEARCH_COMMAND_SYSTEM_PROMPT,
        userPrompt: message,
      });

    if (!searchCommand) {
      throw new BadRequestException(
        'We could not understand your request. Please try rephrasing your message to be more specific about what you are looking for.',
      );
    }

    this.logger.log('Search command extracted:', searchCommand);

    const { action, parameters } = searchCommand;
    const { price, ...restParameters } = parameters;

    const { results = [] } = await this.foursquareService.searchPlaces({
      categories: SEARCH_ACTION_TO_FOURSQUARE_CATEGORY_ID[action],
      min_price: price ? parseInt(price) : undefined,
      ...restParameters,
    });

    return results;
  }
}
