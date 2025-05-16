import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { FoursquareService } from './foursquare.service';

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
});
