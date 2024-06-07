import app from './app';
import { config } from './config/config';
import cluster from 'cluster';
import os from 'os';
import logger from './utils/Logger';

const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment as 'development' | 'production'];

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    logger.info(`Master process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.warn(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        logger.info('Starting a new worker');
        cluster.fork();
    });
} else {
    app.listen(envConfig.server.port, () => {
        logger.info(`Worker ${process.pid} started, listening on port ${envConfig.server.port}`);
    });
}
