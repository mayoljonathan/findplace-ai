import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { OpenAiService } from './open-ai.service';
import { OpenAI } from 'openai';

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn(),
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
});
