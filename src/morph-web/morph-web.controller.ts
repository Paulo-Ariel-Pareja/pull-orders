import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { MorphWebService } from './morph-web.service';
import { CreateMorphWebDto } from './dto/create-morph-web.dto';
import { UpdateMorphWebDto } from './dto/update-morph-web.dto';
import { Order } from 'src/interface/order.interface';
import { MorphWeb } from './entities/morph-web.entity';

@Controller('morph-web')
export class MorphWebController {
  constructor(private readonly morphWebService: MorphWebService) {}

  @Post()
  create(@Body() order: Order) {
    return this.morphWebService.create(order);
  }

  /*@Get()
  findAll() {
    return this.morphWebService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.morphWebService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMorphWebDto: UpdateMorphWebDto,
  ) {
    return this.morphWebService.update(+id, updateMorphWebDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.morphWebService.remove(+id);
  }*/
}
