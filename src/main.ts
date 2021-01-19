import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config();

const { NODE_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  await app.listen(NODE_PORT || 5000);
}
bootstrap();
