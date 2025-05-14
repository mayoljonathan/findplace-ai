import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { OpenAiModule } from '../../services/open-ai/open-ai.module';

@Module({
  imports: [OpenAiModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
