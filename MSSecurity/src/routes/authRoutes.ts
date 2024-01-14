import { Server } from '@hapi/hapi';
import { AuthController } from '../controllers/authController';

export const authRoutes = (server: Server) => {
    const controller = new AuthController();

    server.route({
        method: 'POST',
        path: '/generate-security-token',
        handler: (request, h) => controller.generateSecurityToken(request, h),
    });

    server.route({
        method: 'POST',
        path: '/validate-token',
        handler: (request, h) => controller.validateToken(request, h),
    });
};
