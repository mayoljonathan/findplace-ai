import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { SearchDto } from './dto/search.dto';

@Controller()
export class SearchController {
  @Post('/execute')
  search(@Body() data: SearchDto) {
    throw new NotImplementedException();
  }
}
