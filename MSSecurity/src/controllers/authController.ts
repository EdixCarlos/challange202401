import { Lifecycle, Request, ResponseToolkit } from '@hapi/hapi';
import { AuthService } from '../services/authService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async generateSecurityToken(req: Request, h: ResponseToolkit): Promise<Lifecycle.ReturnValue | undefined> {
        try {
            const token = this.authService.generateToken();
            await this.authService.registerToken(token);
            return h.response({ token }).code(200);
        } catch (error) {
            // Manejo de errores, asegurándonos de que siempre haya un return o throw.
            if (error instanceof Error) {
                return h.response({ error: error.message }).code(500);
            }
            // Incluso si no puedes manejar el error, deberías retornar o lanzar un error.
            return h.response({ error: 'An unknown error occurred' }).code(500);
        }
    }

    public async validateToken(req: Request, h: ResponseToolkit): Promise<Lifecycle.ReturnValue | undefined> {
        try {
            const { token } = req.payload as any;
            const isValid = await this.authService.validateToken(token);
            return h.response({ isValid }).code(isValid ? 200 : 404);
        } catch (error) {
            // Manejo de errores similar al anterior.
            if (error instanceof Error) {
                return h.response({ error: error.message }).code(500);
            }
            return h.response({ error: 'An unknown error occurred' }).code(500);
        }
    }

}
