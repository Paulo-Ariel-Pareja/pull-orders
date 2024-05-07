import { IsEnum } from 'class-validator';
import { Status } from '../enum/status.enum';
import { ShippingStatus } from '../enum/shipping-status.enum';

export class ActualizarEstadoDto {
  @IsEnum(Status)
  status: Status;

  @IsEnum(ShippingStatus)
  shippingStatus: ShippingStatus;
}
