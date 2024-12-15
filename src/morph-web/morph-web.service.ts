import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { Order, Product } from '../interface/order.interface';
import { MorphWeb } from './entities/morph-web.entity';
import { Notificaciones } from './entities/notificaciones.entity';
import { Web } from './entities/web.entity';

@Injectable()
export class MorphWebService {
  private readonly logger = new Logger(MorphWebService.name);

  constructor(
    @InjectRepository(MorphWeb)
    private aprobacionDb: Repository<MorphWeb>,

    @InjectRepository(Notificaciones)
    private notificacionesDb: Repository<Notificaciones>,

    @InjectRepository(Web)
    private webDb: Repository<Web>,
  ) {}

  async create(order: Order) {
    try {
      await this.transformAndSave(order);
    } catch (error) {
      throw error;
    }
  }

  private async transformAndSave(order: Order) {
    try {
      const base = {
        unico: null,
        comprador: order.contact_name.substring(0, 60),
        apodo: '',
        tipo_documento: '',
        documento: order.contact_identification.substring(0, 15),
        email: order.contact_email.substring(0, 70),
        telefono: this.formatPhone(order.contact_phone).substring(0, 25),
        destino: order.billing_city.substring(0, 60),
        direccion: order.shipping_address.address
          ? `${order.shipping_address.address} ${order.shipping_address.number} ${order.shipping_address.floor}`.substring(
              0,
              90,
            )
          : '',
        informacion_adicional: order.note ? order.note.substring(0, 45) : '',
        ciudad: order.shipping_address.city
          ? order.shipping_address.city.substring(0, 45)
          : '',
        provincia: order.shipping_address.province
          ? order.shipping_address.province.substring(0, 45)
          : '',
        codigo_postal: order.shipping_address.zipcode
          ? order.shipping_address.zipcode.substring(0, 10)
          : '',
        canal: 'TIENDA NUBE',
        id_canal: order.id.toString(),
        fecha_compra: dayjs(order.created_at).format(),
        id_mercadopago: `TN${order.number}`,
        fecha_pago: dayjs(order.paid_at).format(),
        costo_envio: order.shipping_cost_customer
          ? Number(order.shipping_cost_customer)
          : 0,
        tracking_code: '',
        sucursal: this.pickSucursal(
          order.shipping_option,
          order.shipping_address.zipcode,
        ).substring(0, 20),
        impreso: 'NO',
        estado_pedido: 'A recibir',
        fecha_estado: dayjs().format(),
        factura: '',
        id_cliente: '',
        descuento_compra: order.discount ? Number(order.discount) : 0,
      };

      for (let index = 0; index < order.products.length; index++) {
        console.log('index: ', index);
        const product: Product = order.products[index];
        const subTotal = Number(product.price) * product.quantity;
        const productInfo = {
          codigo: product.sku.substring(0, 8),
          descripcion: product.name.substring(0, 90),
          cantidad: product.quantity,
          sub_total: subTotal,
        };
        let newRow = new MorphWeb();
        newRow = { ...base, ...productInfo };
        await this.aprobacionDb.save(newRow);
        base.costo_envio = 0;
        base.descuento_compra = 0;
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private formatPhone(phone: string): string {
    if (phone.startsWith('+54', 0)) return phone.substring(3);
    return phone;
  }

  private pickSucursal(opcion: string, zipcode: string): string {
    let sucursal = 'VERIFICAR';
    if (!opcion) return sucursal;

    switch (opcion.toUpperCase()) {
      case 'Pickit - Envio a domicilio':
        return 'PICKIT';
      case 'Punto de retiro':
        return 'CORREO ARGENTINO';
    }

    switch (opcion.substring(17).toUpperCase()) {
      case 'Devoto Shopping'.toUpperCase():
        return 'DEVOTO';
      case 'Solar de la Abadia'.toUpperCase():
        return 'SOLAR';
      case 'Caballito'.toUpperCase():
        return 'CABALLITO';
      case 'Patio Olmos'.toUpperCase():
        return 'CORDOBA';
      case 'Flores'.toUpperCase():
        return 'FLORES';
      case 'Las Toscas Shopping'.toUpperCase():
        return 'LAS TOSCAS';
      case 'Lomitas Street'.toUpperCase():
        return 'LOMITAS';
      case 'Paseo Aldrey'.toUpperCase():
        return 'MDQ';
      case 'Olazabal'.toUpperCase():
        return 'OLAZABAL';
      case 'Olleros'.toUpperCase():
        return 'OLLEROS';
      case 'Alto Rosario'.toUpperCase():
        return 'ROSARIO';
      case 'Microcentro'.toUpperCase():
        return 'SARMIENTO';
      case 'Shopping del Siglo'.toUpperCase():
        return 'SIGLO';
      case 'Solar'.toUpperCase():
        return 'SOLAR';
      case 'Tortugas Open Mall'.toUpperCase():
        return 'TORTUGAS';
      case 'Triunvirato'.toUpperCase():
        return 'TRIUNVIRATO';
      case 'Recoleta Urban'.toUpperCase():
        return 'URBAN';
      default:
        if (opcion.toUpperCase() === 'LOGISTICA MERCOSUR') {
          sucursal = 'MERCOSUR';
        } else if (opcion.toUpperCase().includes('ANDREANI')) {
          sucursal = 'ANDREANI';
        } else if (
          opcion.toUpperCase() === 'Envio Gratis en CABA y GBA'.toUpperCase()
        ) {
          const cp = zipcode ? Number(zipcode) : 0;
          if (cp <= 1499 && cp >= 1000) return 'ENVIO POMAR';
          return 'MERCOSUR';
        }
        break;
    }

    return sucursal;
  }

  getNotificacions() {
    return this.notificacionesDb.find({ take: 20 });
  }

  deleteNotifications(orden: string) {
    return this.notificacionesDb.delete({ orden });
  }

  async existInApprovation(id_canal: string) {
    const orden = await this.aprobacionDb.findBy({ id_canal });
    return orden.length != 0;
  }

  async existInOperations(id_canal: string) {
    const orden = await this.webDb.findBy({ id_canal });
    return orden.length != 0;
  }
}
