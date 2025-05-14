import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { OpenAiService } from '../../services/open-ai/open-ai.service';
import OpenAI from 'openai';
import { BadRequestException } from '@nestjs/common';
import { SearchCommand } from './search.types';
import { CONVERT_USER_PROMPT_TO_COMMAND_SYSTEM_PROMPT } from '../../services/open-ai/constants/prompts';

describe('SearchService', () => {
  let service: SearchService;
  let openAiService: jest.Mocked<OpenAiService>;

  beforeEach(async () => {
    // Create mock for OpenAiService
    const mockOpenAiService = {
      openai: jest.mocked(OpenAI),
      createChatCompletion: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: OpenAiService,
          useValue: mockOpenAiService,
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    openAiService = module.get(OpenAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(openAiService).toBeDefined();
    expect(openAiService.openai).toBeDefined();
  });

  describe('search', () => {
    it('should return BadRequestException if OpenAI response failed to extract SearchCommand from the message', async () => {
      const message = 'some giberrish message';
      openAiService.createChatCompletion.mockResolvedValue(null);

      await expect(service.search(message)).rejects.toThrow(
        new BadRequestException(
          'We could not understand your request. Please try rephrasing your message to be more specific about what you are looking for.',
        ),
      );
    });

    it('should return search command if OpenAI response was able to extract and convert it to a SearchCommand', async () => {
      const message =
        "Find me a cheap sushi restaurant in downtown Los Angeles that's open now and has at least a 4-star rating";
      const searchCommand: SearchCommand = {
        action: 'restaurant_search',
        parameters: {
          query: 'sushi',
          near: 'downtown Los Angeles',
          price: '1',
          open_now: true,
        },
      };
      openAiService.createChatCompletion.mockResolvedValue(searchCommand);

      const result = await service.search(message);

      expect(result).toEqual(searchCommand);
      expect(openAiService.createChatCompletion).toHaveBeenCalledWith({
        systemPrompt: CONVERT_USER_PROMPT_TO_COMMAND_SYSTEM_PROMPT,
        userPrompt: message,
      });
    });
  });
});
