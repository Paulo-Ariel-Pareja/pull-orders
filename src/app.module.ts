import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import appCondig from './config/app.config';
import dbConfig from './config/db.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TiendaNubeModule } from './tienda-nube/tienda-nube.module';
import { MorphWebModule } from './morph-web/morph-web.module';
import { MorphWeb } from './morph-web/entities/morph-web.entity';
import { Web } from './morph-web/entities/web.entity';
import { Notificaciones } from './morph-web/entities/notificaciones.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appCondig, dbConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('dbConfig.host'),
        port: configService.get<number>('dbConfig.port'),
        username: configService.get<string>('dbConfig.username'),
        password: configService.get<string>('dbConfig.password'),
        database: configService.get<string>('dbConfig.database'),
        entities: [MorphWeb, Web, Notificaciones],
        acquireTimeout: 1000000,
        connectTimeout: 1000000,
        //synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    TiendaNubeModule,
    MorphWebModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
