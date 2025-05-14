import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import {
  FoursquarePlacesRequestParams,
  FoursquarePlacesResponse,
} from './types';

@Injectable()
export class FoursquareService {
  private readonly logger = new Logger(FoursquareService.name);

  constructor(private readonly httpService: HttpService) {}

  async searchPlaces(params: Partial<FoursquarePlacesRequestParams>) {
    this.logger.log('Searching for places', params);

    const response = await lastValueFrom(
      this.httpService.get<FoursquarePlacesResponse>('/v3/places/search', {
        params,
      }),
    );

    return response.data;
  }
}
