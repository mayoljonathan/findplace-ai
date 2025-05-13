import { Body, Controller, Post } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/execute')
  search(@Body() { message }: SearchDto) {
    return this.searchService.search(message);
  }
}
