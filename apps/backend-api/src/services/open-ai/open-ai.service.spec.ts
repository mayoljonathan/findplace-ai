import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { OpenAiService } from './open-ai.service';
import { OpenAI } from 'openai';
import { SearchCommand } from '../../features/search/types';
import { CONVERT_MESSAGE_TO_SEARCH_COMMAND_SYSTEM_PROMPT } from './constants/prompts';

const mockCreate = jest.fn();

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  })),
}));

describe('OpenAiService', () => {
  let service: OpenAiService;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    // Create mock for ConfigService
    const mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        switch (key) {
          case 'OPENAI_API_KEY':
            return 'mock-api-key';
          case 'OPENAI_MODEL':
            return 'mock-model';
          default:
            return undefined;
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenAiService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<OpenAiService>(OpenAiService);
    configService = module.get(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize OpenAI with correct API key and model', () => {
    expect(OpenAI).toHaveBeenCalledWith({
      apiKey: 'mock-api-key',
    });
    expect(configService.get('OPENAI_API_KEY')).toBe('mock-api-key');
    expect(configService.get('OPENAI_MODEL')).toBe('mock-model');
    expect(service.openai).toBeDefined();
  });

  describe('createChatCompletion', () => {
    const systemPrompt = CONVERT_MESSAGE_TO_SEARCH_COMMAND_SYSTEM_PROMPT;
    const userPrompt = 'Find me a sushi restaurant in Cebu';
    const expectedSearchCommand: SearchCommand = {
      action: 'restaurant_search',
      parameters: {
        query: 'sushi',
        near: 'Cebu',
        open_at: null,
        open_now: null,
        price: null,
      },
    };

    it('should create chat completion with correct parameters', async () => {
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: JSON.stringify(expectedSearchCommand),
            },
          },
        ],
      });

      const result = await service.createChatCompletion<SearchCommand>({
        systemPrompt,
        userPrompt,
      });

      expect(mockCreate).toHaveBeenCalledWith({
        model: 'mock-model',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      });
      expect(result).toEqual(expectedSearchCommand);
    });

    it('should return null when OpenAI returns null content', async () => {
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: null,
            },
          },
        ],
      });

      const result = await service.createChatCompletion<SearchCommand>({
        systemPrompt,
        userPrompt,
      });

      expect(result).toBeNull();
    });

    it('should handle OpenAI API errors', async () => {
      const error = new Error('API Error');
      mockCreate.mockRejectedValue(error);

      await expect(
        service.createChatCompletion<SearchCommand>({
          systemPrompt,
          userPrompt,
        }),
      ).rejects.toThrow(error);
    });

    it('should handle empty choices array', async () => {
      mockCreate.mockResolvedValue({
        choices: [],
      });

      const result = await service.createChatCompletion<SearchCommand>({
        systemPrompt,
        userPrompt,
      });

      expect(result).toBeNull();
    });
  });
});
