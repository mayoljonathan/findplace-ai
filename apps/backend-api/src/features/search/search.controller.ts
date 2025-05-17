import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';
import { ApiKeyGuard } from '../../common/guards';

@UseGuards(ApiKeyGuard)
@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/execute')
  search(@Body() { message }: SearchDto) {
    return this.searchService.search(message);
  }
}
