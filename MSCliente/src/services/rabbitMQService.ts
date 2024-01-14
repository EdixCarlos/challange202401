import amqp from 'amqplib';

class RabbitMQService {

    constructor() {
        this.connect();
    }

    async connect() {
        const rabbitUrl = process.env.RABBITMQ_URL;
        if (!rabbitUrl) {
            throw new Error('La variable de entorno RABBITMQ_URL no está definida.');
        }

        const connection = await amqp.connect(rabbitUrl);
        this.channel = await connection.createChannel();
    }

    private channel: amqp.Channel | null = null;

    async enviarMensajeCorreo(email: string) {
        if (!this.channel) {
            throw new Error('No se ha establecido conexión con RabbitMQ.');
        }

        const queue = 'emailQueue';
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(email));
    }

}

export default new RabbitMQService();
