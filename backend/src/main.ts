import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3333;

  await app.listen(port);
}
bootstrap();
