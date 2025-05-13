import { Controller, NotImplementedException, Post } from '@nestjs/common';

@Controller()
export class SearchController {
  @Post('/execute')
  search() {
    throw new NotImplementedException();
  }
}
