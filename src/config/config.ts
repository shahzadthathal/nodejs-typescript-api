import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

interface AppConfig {
  server: {
    port: string | number;
  };
  database: DatabaseConfig;
  jwt: {
    secret: string;
    exp: string;
  };
}

interface Config {
  development: AppConfig;
  production: AppConfig;
}

export const config: Config = {
  development: {
    server: {
      port: process.env.PORT || 3000,
    },
    database: {
      username: process.env.DB_USERNAME || 'laravel',
      password: process.env.DB_PASSWORD || 'laravel',
      database: process.env.DB_NAME || 'laravel_api_db',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'postgres',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your_secret_key_here',
      exp: process.env.JWT_EXP || '1h',
    },
  },
  production: {
    server: {
      port: process.env.PORT || 3000,
    },
    database: {
      username: process.env.DB_USERNAME || 'laravel',
      password: process.env.DB_PASSWORD || 'laravel',
      database: process.env.DB_NAME || 'laravel_api_db',
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'postgres',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your_secret_key_here',
      exp: process.env.JWT_EXP || '1h',
    },
  },
};
