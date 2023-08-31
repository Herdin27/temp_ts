import mysql, { Pool } from 'mysql'

export function connectToDatabase() {
    const connection: Pool = mysql.createPool({
        connectTimeout: 10000,
        waitForConnections: true,
        connectionLimit: 100,
        host: '192.168.20.6',
        port: 3311,
        user: 'tab',
        password: 'kn11t000o_i5',
        database: 'muliaabadi_baru',
        multipleStatements: true
    });
    connection.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release();
            throw err;
        }
        connection.release()
    })

    return connection;
}

connectToDatabase();