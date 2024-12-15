import { Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

import { Status } from './enum/status.enum';
import { Order } from '../interface/order.interface';
import { ActualizarEstadoDto } from './dto/actualizar-estado.dto';
import { ShippingStatus } from './enum/shipping-status.enum';
import { ConfigService } from '@nestjs/config';
import { PaymentStatus } from './enum/payment-status.enum';

@Injectable()
export class TiendaNubeService {
  private readonly logger = new Logger(TiendaNubeService.name);
  private readonly agent: string;
  private readonly bearer: string;
  private readonly userId: string;
  private readonly perPage: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.agent = this.configService.getOrThrow('appConfig.agent');
    this.bearer = this.configService.getOrThrow('appConfig.bearer');
    this.userId = this.configService.getOrThrow('appConfig.userId');
    this.perPage = Number(
      this.configService.getOrThrow('appConfig.orderPerPage'),
    );
  }

  async find(status: Status, payment: PaymentStatus, shipping: ShippingStatus) {
    return this.getOperationsByStatus(status, payment, shipping);
  }

  async updateShipping(id: number, { shippingStatus }: ActualizarEstadoDto) {
    return this.updateOperationsShipping(shippingStatus, id);
  }

  private async updateOperationsShipping(
    shippingStatus: ShippingStatus,
    id: number,
  ): Promise<Order> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': this.agent,
        Authentication: `bearer ${this.bearer}`,
      },
    };
    const body: any = { shipping_status: shippingStatus };

    const { data } = await firstValueFrom(
      this.httpService
        .post<Order>(
          `https://api.tiendanube.com/v1/${this.userId}/orders/${id}/pack`,
          body,
          headersRequest,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw error;
          }),
        ),
    );
    return data;
  }

  private async getOperationsByStatus(
    status: Status,
    payment: PaymentStatus,
    shipping: ShippingStatus,
  ): Promise<Order[]> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': this.agent,
        Authentication: `bearer ${this.bearer}`,
      },
    };
    const url = `https://api.tiendanube.com/v1/${this.userId}/orders?status=${status}&payment_status=${payment}&shipping_status=${shipping}&per_page=${this.perPage}`;
    const { data } = await firstValueFrom(
      this.httpService.get<Order[]>(url, headersRequest).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw error;
        }),
      ),
    );
    return data;
  }

  async getOneOperation(orden: string): Promise<Order> {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': this.agent,
        Authentication: `bearer ${this.bearer}`,
      },
    };
    const url = `https://api.tiendanube.com/v1/${this.userId}/orders/${orden}`;
    const { data } = await firstValueFrom(
      this.httpService.get(url, headersRequest).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw error;
        }),
      ),
    );
    return data;
  }
}
