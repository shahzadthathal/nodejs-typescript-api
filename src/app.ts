import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/AuthRoutes';
import categoryRoutes from './routes/CategoryRoutes';
import postRoutes from './routes/PostRoutes';
import sequelize from './utils/DB';
import logger from './utils/Logger';
import { errorHandler } from './utils/ErrorHandler';
import { setupSwagger } from './utils/Swagger';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);

setupSwagger(app); // Initialize Swagger documentation


app.use(errorHandler);

sequelize.sync().then(() => {
    logger.info('Database synced');
});

export default app;
