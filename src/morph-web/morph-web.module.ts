import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MorphWebService } from './morph-web.service';
import { MorphWebController } from './morph-web.controller';
import { MorphWeb } from './entities/morph-web.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MorphWeb])],
  controllers: [MorphWebController],
  providers: [MorphWebService],
  exports: [MorphWebService],
})
export class MorphWebModule {}
