import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => ({
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: process.env.DATABASE_PORT || 43060,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASS || 'secret',
  database: process.env.DATABASE_NAME || 'web',
}));
