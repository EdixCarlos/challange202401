import database from '../database/mysqlConnection';

interface Cliente {
    nombre: string;
    email: string;
}

class ClienteModel {
    async agregarCliente(cliente: Cliente): Promise<void> {
        const query = 'INSERT INTO clientes (nombre, email) VALUES (?, ?)';
        await database.execute(query, [cliente.nombre, cliente.email]);
    }

}

export default new ClienteModel();
