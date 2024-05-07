import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TiendaNubeService } from './tienda-nube.service';
import { Status } from './enum/status.enum';
import { Order } from '../interface/order.interface';
import { MorphWebService } from '../morph-web/morph-web.service';
import { ShippingStatus } from './enum/shipping-status.enum';
import mock from './mock/orders.mock';
import { PaymentStatus } from './enum/payment-status.enum';

@Injectable()
export class CronjobTiendaNubeService {
  private readonly logger = new Logger(CronjobTiendaNubeService.name);

  constructor(
    private readonly tiendaNube: TiendaNubeService,
    private readonly morphService: MorphWebService,
  ) {}

  //@Cron('* * * * *')
  @Cron('*/5 * * * 1-5')
  async handleCron() {
    try {
      this.logger.debug('obtener operaciones en tienda nube');

      const orders: Order[] = await this.tiendaNube.find(
        Status.open,
        PaymentStatus.paid,
        ShippingStatus.unpacked,
      );
      //const orders: Order[] = mock as any[];
      this.logger.log(`resultados obtenidos: ${orders.length}`);

      for (const order of orders) {
        this.logger.log(`Procesando orden #${order.number}`);
        this.logger.debug('Guardar en la base de datos el pedido');
        await this.morphService.create(order);

        this.logger.debug('actualizar estado en tienda nube');
        await this.tiendaNube.updateShipping(order.id, {
          status: Status.open,
          shippingStatus: ShippingStatus.unfulfilled,
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
