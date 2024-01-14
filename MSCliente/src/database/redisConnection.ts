import Redis from 'ioredis';
import 'dotenv/config';

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
    throw new Error("Las variables de entorno para Redis no están definidas.");
}

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
});

redisClient.on('error', (err) => {
    console.error('Error al conectar a Redis:', err);
});

export default redisClient;
