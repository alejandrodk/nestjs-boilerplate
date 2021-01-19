import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '../../application/controllers/app.controller';
import { configuration } from '../config/env.objects';
import { validate } from '../config/env.validation';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
