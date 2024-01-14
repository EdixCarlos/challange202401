import 'dotenv/config';

import Hapi from '@hapi/hapi';
import config from './config';
import rabbitMQService from "./services/rabbitMQService";

const init = async () => {
    const server = Hapi.server({
        port: config.port,
        host: config.host
    });
    await rabbitMQService.connect();

    await server.start();
    console.log(`Servidor corriendo en: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
