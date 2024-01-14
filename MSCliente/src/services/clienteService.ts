import ClienteModel from '../models/clienteModel';
import rabbitMQService from './rabbitMQService';
import redisClient from '../database/redisConnection';

class ClienteService {
    async registrarCliente(clienteData: any): Promise<void> {
        await ClienteModel.agregarCliente(clienteData);

        if (await this.debeEnviarCorreo()) {
            rabbitMQService.enviarMensajeCorreo(clienteData.email);
        }
    }

    async debeEnviarCorreo() {
        const enviarCorreo = await redisClient.get('envio_correos');
        return enviarCorreo === 'true';
    }
}


export default new ClienteService();
