import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { validationExceptionFactory } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  const port = parseInt(process.env.PORT) || 4000;

  await app.listen(port, () => {
    console.log(`API running in port: ${port}`);
  });
}
bootstrap();
