import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MorphWebService } from './morph-web.service';
import { MorphWebController } from './morph-web.controller';
import { MorphWeb } from './entities/morph-web.entity';
import { Web } from './entities/web.entity';
import { Notificaciones } from './entities/notificaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MorphWeb, Web, Notificaciones])],
  controllers: [MorphWebController],
  providers: [MorphWebService],
  exports: [MorphWebService],
})
export class MorphWebModule {}
