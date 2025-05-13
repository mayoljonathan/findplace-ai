import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FoursquareService } from './foursquare.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariable>) => ({
        baseURL: configService.get('FOURSQUARE_API_URL'),
        headers: {
          Authorization: `Bearer ${configService.get('FOURSQUARE_API_KEY')}`,
          'Content-Type': 'application/json',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [FoursquareService],
  exports: [FoursquareService],
})
export class FoursquareModule {}
