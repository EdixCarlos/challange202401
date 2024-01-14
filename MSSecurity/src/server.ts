import 'dotenv/config';

import Hapi from '@hapi/hapi';
import config from './config';
import { authRoutes } from './routes/authRoutes';

const init = async () => {
    const server = Hapi.server({
        port: config.port,
        host: config.host,
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Authorization'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }

        }
    });
    authRoutes(server);

    await server.start();
    console.log(`Servidor corriendo en: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
