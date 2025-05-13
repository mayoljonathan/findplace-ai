import { Module } from '@nestjs/common';
import { SearchModule } from './features/search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
