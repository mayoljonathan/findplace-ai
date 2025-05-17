import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { FoursquareService } from './foursquare.service';
import { of } from 'rxjs';
import {
  FoursquarePlacesResponse,
  FoursquarePlacesRequestParams,
} from './types';
import { AxiosResponse } from 'axios';

describe('FoursquareService', () => {
  let service: FoursquareService;
  let httpService: jest.Mocked<HttpService>;

  beforeEach(async () => {
    // Create mock for HttpService
    const mockHttpService = {
      axiosRef: {},
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
      head: jest.fn(),
      options: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoursquareService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<FoursquareService>(FoursquareService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchPlaces', () => {
    it('should make a GET request to /v3/places/search with the provided parameters', async () => {
      const params: Partial<FoursquarePlacesRequestParams> = {
        query: 'sushi',
        near: 'Cebu',
        categories: '4d4b7105d754a06374d81259',
        fields: 'fsq_id,name,categories',
      };
      const mockResponse: AxiosResponse<FoursquarePlacesResponse> = {
        data: {
          results: [
            {
              fsq_id: '123',
              name: 'Sushi Place',
              categories: [],
            },
          ],
          context: {
            geo_bounds: {
              circle: {
                center: {
                  latitude: 10.3157,
                  longitude: 123.8854,
                },
                radius: 1000,
              },
            },
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      httpService.get.mockReturnValue(of(mockResponse));

      const result = await service.searchPlaces(params);

      expect(httpService.get).toHaveBeenCalledWith('/v3/places/search', {
        params,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle empty results', async () => {
      const params: Partial<FoursquarePlacesRequestParams> = {
        query: 'nonexistent',
        near: 'Cebu',
      };
      const mockResponse: AxiosResponse<FoursquarePlacesResponse> = {
        data: {
          results: [],
          context: {
            geo_bounds: {
              circle: {
                center: {
                  latitude: 10.3157,
                  longitude: 123.8854,
                },
                radius: 1000,
              },
            },
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      httpService.get.mockReturnValue(of(mockResponse));

      const result = await service.searchPlaces(params);

      expect(httpService.get).toHaveBeenCalledWith('/v3/places/search', {
        params,
      });
      expect(result).toEqual(mockResponse.data);
      expect(result.results).toHaveLength(0);
    });

    it('should handle partial parameters', async () => {
      const params: Partial<FoursquarePlacesRequestParams> = {
        query: 'sushi',
      };
      const mockResponse: AxiosResponse<FoursquarePlacesResponse> = {
        data: {
          results: [
            {
              fsq_id: '123',
              name: 'Sushi Place',
              categories: [],
            },
          ],
          context: {
            geo_bounds: {
              circle: {
                center: {
                  latitude: 10.3157,
                  longitude: 123.8854,
                },
                radius: 1000,
              },
            },
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      httpService.get.mockReturnValue(of(mockResponse));

      const result = await service.searchPlaces(params);

      expect(httpService.get).toHaveBeenCalledWith('/v3/places/search', {
        params,
      });
      expect(result).toEqual(mockResponse.data);
    });
  });
});
