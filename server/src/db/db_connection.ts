import dotenv from 'dotenv';
import mysql2, { Pool, PoolConnection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

dotenv.config();

class DBConnection {
    private static instance: DBConnection; 
    private db: Pool;

    private constructor() {
        this.db = mysql2.createPool({
            host: process.env.DB_HOST as string,
            user: process.env.DB_USER as string,
            password: process.env.DB_PASS as string,
            database: process.env.DB_DATABASE as string,
        });
        this.query = this.query.bind(this);
        this.checkConnection();
    }

    public static getInstance(): DBConnection {
        if (!DBConnection.instance) {
            DBConnection.instance = new DBConnection();
        }
        return DBConnection.instance;
    }

    private async checkConnection(): Promise<void> {
        try {
            const connection: PoolConnection = await this.db.getConnection();
            connection.release();
        } catch (err: any) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.');
            } else if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.');
            } else if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.');
            } else {
                console.error('An error occurred during database connection:', err);
            }
        }
    }

    public async query<T extends RowDataPacket[] | ResultSetHeader>(sql: string, values?: any[]): Promise<T> {
        try {
            const [result] = await this.db.execute<T>(sql, values);
            return result;
        } catch (err: any) {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : 500;
            throw err;
        }
    }
}

const HttpStatusCodes: { [key: string]: number } = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409,
});

export default DBConnection; 


