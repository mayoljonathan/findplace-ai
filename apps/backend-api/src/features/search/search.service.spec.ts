import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { OpenAiService } from '../../services/open-ai/open-ai.service';
import { BadRequestException } from '@nestjs/common';
import { SearchCommand } from './types';
import { CONVERT_MESSAGE_TO_SEARCH_COMMAND_SYSTEM_PROMPT } from '../../services/open-ai/constants/prompts';
import { FoursquareService } from '../../services/foursquare/foursquare.service';
import { FoursquarePlacesResponse } from '../../services/foursquare/types';
import { SEARCH_ACTION_TO_FOURSQUARE_CATEGORY_ID } from './constants/search';

describe('SearchService', () => {
  let service: SearchService;
  let openAiService: jest.Mocked<OpenAiService>;
  let foursquareService: jest.Mocked<FoursquareService>;

  beforeEach(async () => {
    // Create mock for OpenAiService
    const mockOpenAiService = {
      createChatCompletion: jest.fn(),
    };

    // Create mock for FoursquareService
    const mockFoursquareService = {
      searchPlaces: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: OpenAiService,
          useValue: mockOpenAiService,
        },
        {
          provide: FoursquareService,
          useValue: mockFoursquareService,
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    openAiService = module.get(OpenAiService);
    foursquareService = module.get(FoursquareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(openAiService).toBeDefined();
    expect(foursquareService).toBeDefined();
  });

  describe('search', () => {
    it('should return BadRequestException if OpenAI response failed to extract SearchCommand from the message', async () => {
      const message = 'some gibberish message';
      openAiService.createChatCompletion.mockResolvedValue(null);

      await expect(service.search(message)).rejects.toThrow(
        new BadRequestException(
          'We could not understand your request. Please try rephrasing your message to be more specific about what you are looking for.',
        ),
      );

      expect(openAiService.createChatCompletion).toHaveBeenCalledWith({
        systemPrompt: CONVERT_MESSAGE_TO_SEARCH_COMMAND_SYSTEM_PROMPT,
        userPrompt: message,
      });
      expect(foursquareService.searchPlaces).not.toHaveBeenCalled();
    });

    it('should process a valid search command and call Foursquare service searchPlaces', async () => {
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
      const mockFoursquareResponse: FoursquarePlacesResponse = {
        results: [
          {
            fsq_id: '4b68a344f964a5203f842be3',
            categories: [
              {
                id: 13276,
                name: 'Sushi Restaurant',
                short_name: 'Sushi',
                plural_name: 'Sushi Restaurants',
                icon: {
                  prefix: 'https://ss3.4sqi.net/img/categories_v2/food/sushi_',
                  suffix: '.png',
                },
              },
            ],
            chains: [],
            closed_bucket: 'Unsure',
            distance: 2097,
            geocodes: {
              main: {
                latitude: 34.05234,
                longitude: -118.262741,
              },
              roof: {
                latitude: 34.05234,
                longitude: -118.262741,
              },
            },
            link: '/v3/places/4b68a344f964a5203f842be3',
            location: {
              address: '1055 Wilshire Blvd',
              census_block: '060372092011004',
              country: 'US',
              cross_street: 'Bixel',
              dma: 'Los Angeles',
              formatted_address:
                '1055 Wilshire Blvd (Bixel), Los Angeles, CA 90017',
              locality: 'Los Angeles',
              postcode: '90017',
              region: 'CA',
            },
            name: 'Tokyo Kitchen',
            related_places: {},
            timezone: 'America/Los_Angeles',
          },
        ],
        context: {
          geo_bounds: {
            circle: {
              center: {
                latitude: 34.0522,
                longitude: -118.2437,
              },
              radius: 1000,
            },
          },
        },
      };
      openAiService.createChatCompletion.mockResolvedValue(searchCommand);
      foursquareService.searchPlaces.mockResolvedValue(mockFoursquareResponse);

      const result = await service.search(message);

      expect(openAiService.createChatCompletion).toHaveBeenCalledWith({
        systemPrompt: CONVERT_MESSAGE_TO_SEARCH_COMMAND_SYSTEM_PROMPT,
        userPrompt: message,
      });
      expect(foursquareService.searchPlaces).toHaveBeenCalledWith({
        categories:
          SEARCH_ACTION_TO_FOURSQUARE_CATEGORY_ID[searchCommand.action],
        query: searchCommand.parameters.query,
        near: searchCommand.parameters.near,
        min_price: parseInt(searchCommand.parameters.price),
        open_now: searchCommand.parameters.open_now,
      });
      expect(result).toEqual(mockFoursquareResponse.results);
    });
  });
});
