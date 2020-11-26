import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
const corsOptions = {
  origin: ['http://localhost:4200'],
  optionSuccessStatus : 200
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.use(morgan('dev'));
  app.useGlobalPipes( new ValidationPipe({
    transform: true,
    whitelist: true
  }));
  await app.listen(3000);
}
bootstrap();
