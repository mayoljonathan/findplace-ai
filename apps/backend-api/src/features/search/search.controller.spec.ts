import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { FoursquarePlace } from '../../services/foursquare/types';
import { BadRequestException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

describe('SearchController', () => {
  let controller: SearchController;
  let searchService: jest.Mocked<SearchService>;

  beforeEach(async () => {
    // Create mock for SearchService
    const mockSearchService = {
      search: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: mockSearchService,
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    searchService = module.get(SearchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(searchService).toBeDefined();
  });

  describe('DTO validation', () => {
    let validationPipe: ValidationPipe;

    beforeEach(() => {
      validationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
    });

    it('should validate required message field', async () => {
      const invalidDto = {} as SearchDto;

      await expect(
        validationPipe.transform(invalidDto, {
          type: 'body',
          metatype: SearchDto,
        }),
      ).rejects.toThrow();
      expect(searchService.search).not.toHaveBeenCalled();
    });

    it('should validate message is not empty', async () => {
      const invalidDto = { message: '   ' } as SearchDto;

      await expect(
        validationPipe.transform(invalidDto, {
          type: 'body',
          metatype: SearchDto,
        }),
      ).rejects.toThrow();
      expect(searchService.search).not.toHaveBeenCalled();
    });

    it('should validate message is a string', async () => {
      const invalidDto = { message: 123 } as unknown as SearchDto;

      await expect(
        validationPipe.transform(invalidDto, {
          type: 'body',
          metatype: SearchDto,
        }),
      ).rejects.toThrow();
      expect(searchService.search).not.toHaveBeenCalled();
    });
  });

  describe('search', () => {
    it('should call searchService.search with the message from the DTO', async () => {
      const searchDto: SearchDto = {
        message: 'Find me a sushi restaurant in Cebu',
      };
      const expectedResults: Partial<FoursquarePlace>[] = [
        {
          fsq_id: '123',
          name: 'Sushi Place',
          categories: [],
          geocodes: {
            main: {
              latitude: 10.3157,
              longitude: 123.8854,
            },
            roof: {
              latitude: 10.3157,
              longitude: 123.8854,
            },
          },
          hours: {
            display: 'Mon-Fri 11:00 AM-10:00 PM',
            is_local_holiday: false,
            open_now: true,
            regular: [],
          },
          location: {
            address: '123 Main St',
            country: 'PH',
            locality: 'Cebu',
            postcode: '6000',
            region: 'CEB',
            address_extended: '',
            census_block: '',
            cross_street: '',
            dma: '',
            formatted_address: '123 Main St, Cebu, CEB 6000',
          },
          photos: [],
          popularity: 0.8,
          price: 2,
          rating: 4.5,
          tel: '+63 32 123 4567',
          website: 'https://sushiplace.com',
        },
      ];
      searchService.search.mockResolvedValue(expectedResults);

      const result = await controller.search(searchDto);

      expect(searchService.search).toHaveBeenCalledWith(searchDto.message);
      expect(result).toEqual(expectedResults);
    });

    it('should handle search service errors', async () => {
      const searchDto: SearchDto = {
        message: 'gibberish message',
      };
      const error = new BadRequestException(
        'We could not understand your request. Please try rephrasing your message to be more specific about what you are looking for.',
      );
      searchService.search.mockRejectedValue(error);

      await expect(controller.search(searchDto)).rejects.toThrow(error);
      expect(searchService.search).toHaveBeenCalledWith(searchDto.message);
    });
  });
});
