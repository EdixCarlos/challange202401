import { Request, ResponseToolkit } from '@hapi/hapi';
import axios from 'axios';
import ClienteService from '../services/clienteService';

class ClienteController {
    async registrarCliente(request: Request, h: ResponseToolkit) {
        try {
            const token = request.headers.authorization;

            const validacion = await axios.post('http://mssecurity-service:3000/validate-token', { token });
            if (validacion.data.isValid) {
                await ClienteService.registrarCliente(request.payload);
                return h.response({ message: 'Cliente registrado con éxito' }).code(201);
            } else {
                return h.response({ error: 'Token no válido' }).code(401);
            }
        } catch (error) {
            console.error(error);
            return h.response({ error: 'Error al registrar el cliente' }).code(500);
        }
    }
}

export default new ClienteController();
