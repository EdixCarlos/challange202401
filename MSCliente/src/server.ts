import Hapi from '@hapi/hapi';
import 'dotenv/config';
import config from './config';
import { clienteRoutes } from "./routes/clienteRoutes";
import redisClient from "./database/redisConnection";
import ParametrosModel from './models/parametrosModel';

async function cargarParametrosEnRedis() {
    const parametros = await ParametrosModel.obtenerTodosLosParametros();
    parametros.forEach(parametro => {
        redisClient.set(parametro.clave, parametro.valor);
    });
}

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


    clienteRoutes(server);

    await server.start();
    console.log('Servidor corriendo en:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
