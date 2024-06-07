import { Sequelize } from 'sequelize';
import { config } from '../config/config';
import User from './User';
import Category from './Category';
import Post from './Post';

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

const db: any = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize models
db.User = User.initModel(sequelize);
db.Category = Category.initModel(sequelize);
db.Post = Post.initModel(sequelize);

// If you have associations, define them here
// Example:
// db.User.hasMany(db.Post);
// db.Post.belongsTo(db.User);

export default db;
