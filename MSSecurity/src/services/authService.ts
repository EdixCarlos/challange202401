import database from '../database/mysqlConnection';
import { Pool } from 'mysql2/promise';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
    public generateToken(): string {
        return ('00000000' + Math.floor(Math.random() * 99999999).toString()).slice(-8);
    }

    public async registerToken(token: string): Promise<void> {
        const query = 'INSERT INTO security_tokens (token) VALUES (?)';
        const [rows] = await database.query(query, [token]);
    }

    public async validateToken(token: string): Promise<boolean> {
        const query = 'SELECT token FROM security_tokens WHERE token = ?';
        const [rows] = await database.query(query, [token]);

        if (Array.isArray(rows) && rows.length > 0) {
            return true;
        }
        return false;
    }
}
