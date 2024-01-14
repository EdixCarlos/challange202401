import { Server } from '@hapi/hapi';
import ClienteController from '../controllers/clienteController';

export const clienteRoutes = (server: Server) => {
    server.route({
        method: 'POST',
        path: '/clientes/registrar',
        handler: ClienteController.registrarCliente
    });

};
