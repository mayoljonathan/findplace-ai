import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FoursquareService {
  constructor(private readonly httpService: HttpService) {}
}
