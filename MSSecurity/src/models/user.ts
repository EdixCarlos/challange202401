// src/models/user.ts
import pool from '../database/mysqlConnection';

interface User {
    id: string;
    username: string;
    password: string;
}

class UserModel {
    async createUser(user: User): Promise<void> {
        const query = `INSERT INTO users (id, username, password) VALUES (?, ?, ?)`;
        const values = [user.id, user.username, user.password];

        await pool.execute(query, values);
    }

}

export default new UserModel();
