import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: process.env.APP_PORT || 3000,
  agent: process.env.AGENT,
  bearer: process.env.BEARER,
  userId: process.env.USER_ID,
  orderPerPage: process.env.ORDER_PER_PAGE ?? '10',
}));
