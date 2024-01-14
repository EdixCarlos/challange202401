import amqp from 'amqplib';
import emailModel from '../models/emailModel';

class RabbitMQService {
    async connect() {
        const rabbitUrl = process.env.RABBITMQ_URL;
        if (!rabbitUrl) {
            throw new Error('La variable de entorno RABBITMQ_URL no está definida.');
        }
        console.log('Conectando a RabbitMQ...'+rabbitUrl);

        try {
            const connection = await amqp.connect(rabbitUrl);
            const channel = await connection.createChannel();
            const queue = 'emailQueue';

            await channel.assertQueue(queue, { durable: true });

            console.log(`[*] Waiting for messages in ${queue}`);
            channel.consume(queue, async (msg) => {
                if (msg) {
                    const emailDetails = JSON.parse(msg.content.toString());
                    await emailModel.saveEmailDetails(emailDetails);
                    channel.ack(msg);
                }
            });
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
            setTimeout(() => this.connect(), 5000);
        }
    }
}

export default new RabbitMQService();
