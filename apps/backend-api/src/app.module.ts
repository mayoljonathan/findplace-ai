import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SearchModule } from './features/search/search.module';
import { CatchAllErrorFilter } from './common/filters';

@Module({
  imports: [SearchModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchAllErrorFilter,
    },
  ],
})
export class AppModule {}
