import { Sequelize } from 'sequelize';
import { config } from '../config/config';

const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment as 'development' | 'production'];

const sequelize = new Sequelize(
    envConfig.database.database,
    envConfig.database.username,
    envConfig.database.password,
    {
        host: envConfig.database.host,
        dialect: envConfig.database.dialect,
        logging: false, // true to enable SQL logging
    }
);

export default sequelize;
