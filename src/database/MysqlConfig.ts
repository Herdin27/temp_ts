import mysql, { MysqlError, Pool, PoolConnection } from 'mysql'

export function connectToDatabase(viewLog?: boolean) {
    const connection: Pool = mysql.createPool({
        connectTimeout: 10000,
        waitForConnections: true,
        connectionLimit: 100,
        host: String(process.env.DB_HOST),
        port: Number(process.env.DB_PORT),
        user: String(process.env.DB_USER),
        password: String(process.env.DB_PASS),
        database: String(process.env.DB_NAME),
        multipleStatements: true
    });
    connection.getConnection(function (err: MysqlError, connection: PoolConnection) {
        if (err) {
            connection.release();
            throw err;
        }
        viewLog && console.log('Connected to Database');
        connection.release()
    })

    return connection;
}

export const db = connectToDatabase()