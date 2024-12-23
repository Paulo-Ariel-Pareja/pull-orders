import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TiendaNubeService } from './tienda-nube.service';
import { MorphWebService } from '../morph-web/morph-web.service';

@Injectable()
export class CronjobWebService {
  private readonly logger = new Logger(CronjobWebService.name);

  constructor(
    private readonly tiendaNube: TiendaNubeService,
    private readonly morphService: MorphWebService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleNewCron() {
    try {
      this.logger.debug('obtener operaciones en tabla de notificaciones');
      const notifications = await this.morphService.getNotificacions();

      this.logger.log(`notificaciones leidas: ${notifications.length}`);

      for (const notification of notifications) {
        const { tn_id } = notification;
        try {
          this.logger.debug(
            'consulta tabla autorizaciones para validar si ya existe',
          );
          const authExist = await this.morphService.existInApprovation(tn_id);

          this.logger.debug(
            'consulta tabla operaciones para validar si ya existe',
          );
          const operationExist =
            await this.morphService.existInOperations(tn_id);

          if (!authExist && !operationExist) {
            this.logger.debug('obtener datos de orden desde proveedor');
            const rawOrder = await this.tiendaNube.getOneOperation(tn_id);

            this.logger.debug('Guardar en la base de datos el pedido');
            await this.morphService.create(rawOrder);
          }

          this.logger.debug('quitar notificacion');
          await this.deleteNotification(tn_id);
        } catch (error) {
          this.logger.error(error);
        }
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async deleteNotification(orden: string) {
    await this.morphService.deleteNotifications(orden);
  }
}
