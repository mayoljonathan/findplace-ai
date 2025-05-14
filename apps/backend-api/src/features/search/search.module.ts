import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { OpenAiModule } from '../../services/open-ai/open-ai.module';
import { FoursquareModule } from '../../services/foursquare/foursquare.module';

@Module({
  imports: [OpenAiModule, FoursquareModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
