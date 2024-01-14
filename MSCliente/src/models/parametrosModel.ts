import database from '../database/mysqlConnection';
import { RowDataPacket } from 'mysql2';

interface ParametroRow extends RowDataPacket {
    clave: string;
    valor: string;
}

class ParametrosModel {
    async obtenerParametro(clave: string): Promise<string | null> {
        const [rows] = await database.execute<RowDataPacket[]>('SELECT valor FROM parametros_globales WHERE clave = ?', [clave]);
        const parametros = rows as ParametroRow[];
        if (parametros.length > 0) {
            return parametros[0].valor;
        }
        return null;
    }

    async obtenerTodosLosParametros(): Promise<ParametroRow[]> {
        const [rows] = await database.execute<RowDataPacket[]>('SELECT clave, valor FROM parametros_globales');
        return rows as ParametroRow[];
    }
}

export default new ParametrosModel();
