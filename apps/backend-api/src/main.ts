import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const port = parseInt(process.env.PORT) || 4000;

  await app.listen(port, () => {
    console.log(`API running in port: ${port}`);
  });
}
bootstrap();
