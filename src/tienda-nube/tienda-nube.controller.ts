import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { TiendaNubeService } from './tienda-nube.service';
import { Status } from './enum/status.enum';
import { EnumValidationPipe } from './pipe/enum.pipe';
import { ActualizarEstadoDto } from './dto/actualizar-estado.dto';
import { PaymentStatus } from './enum/payment-status.enum';
import { ShippingStatus } from './enum/shipping-status.enum';

@Controller('tienda-nube')
export class TiendaNubeController {
  constructor(private readonly tiendaNubeService: TiendaNubeService) {}

  @Get()
  find(
    @Query('status', new EnumValidationPipe(Status))
    status: Status,
    @Query('payment', new EnumValidationPipe(PaymentStatus))
    payment: PaymentStatus,
    @Query('status', new EnumValidationPipe(ShippingStatus))
    shipping: ShippingStatus,
  ) {
    return this.tiendaNubeService.find(status, payment, shipping);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: ActualizarEstadoDto) {
    return this.tiendaNubeService.updateShipping(id, body);
  }
}
