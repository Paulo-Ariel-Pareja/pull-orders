import { Controller, Post, Body } from '@nestjs/common';

import { MorphWebService } from './morph-web.service';

import { Order } from 'src/interface/order.interface';

@Controller('morph-web')
export class MorphWebController {
  constructor(private readonly morphWebService: MorphWebService) {}

  @Post()
  create(@Body() order: Order) {
    return this.morphWebService.create(order);
  }
}
