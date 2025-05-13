import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SearchModule } from './features/search/search.module';
import { CatchAllErrorFilter } from './common/filters';
import { HttpLoggerMiddleware } from './common/middlewares';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
