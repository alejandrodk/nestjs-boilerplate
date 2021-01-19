import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrmModule } from '../database/orm';
import { AppController } from '../../application/controllers/app.controller';
import { configuration, EnvObjects, MongoOptions } from '../config/env.objects';
import { validate } from '../config/env.validation';
import { AuthorModule, BookModule } from '../../domain/modules';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    OrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const data = configService.get<MongoOptions>(EnvObjects.MONGO_OPTIONS);
        return { uri: data?.host, ...data?.options };
      },
      inject: [ConfigService],
    }),
    AuthorModule,
    BookModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
