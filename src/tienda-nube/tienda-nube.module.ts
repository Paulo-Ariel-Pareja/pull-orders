import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TiendaNubeService } from './tienda-nube.service';
import { TiendaNubeController } from './tienda-nube.controller';
import { CronjobTiendaNubeService } from './cronjob-tienda-nube.service';
import { MorphWebService } from '../morph-web/morph-web.service';
import { MorphWeb } from '../morph-web/entities/morph-web.entity';
import { Web } from '../morph-web/entities/web.entity';
import { Notificaciones } from '../morph-web/entities/notificaciones.entity';
import { CronjobWebService } from './cronjob-web.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([MorphWeb, Web, Notificaciones]),
  ],
  controllers: [TiendaNubeController],
  providers: [
    TiendaNubeService,
    // CronjobTiendaNubeService,
    MorphWebService,
    CronjobWebService,
  ],
})
export class TiendaNubeModule {}
