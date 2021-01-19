import morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './infrastructure/modules/app.module';;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(morgan('dev'));

  const NODE_PORT = configService.get('NODE_PORT');
  await app.listen(NODE_PORT);
}
bootstrap();
