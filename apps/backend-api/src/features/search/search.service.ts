import { BadRequestException, Injectable } from '@nestjs/common';
import { CONVERT_USER_PROMPT_TO_COMMAND_SYSTEM_PROMPT } from 'src/services/open-ai/constants/prompts';
import { OpenAiService } from 'src/services/open-ai/open-ai.service';
import { SearchCommand } from './search.types';

@Injectable()
export class SearchService {
  constructor(private readonly openAiService: OpenAiService) {}

  async search(message: string) {
    const result = await this.openAiService.createChatCompletion<SearchCommand>(
      {
        systemPrompt: CONVERT_USER_PROMPT_TO_COMMAND_SYSTEM_PROMPT,
        userPrompt: message,
      },
    );

    if (!result) {
      throw new BadRequestException(
        'We could not understand your request. Please try rephrasing your message to be more specific about what you are looking for.',
      );
    }

    // TODO: Integrate to Foursquare API

    return result;
  }
}
