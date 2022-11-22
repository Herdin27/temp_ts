import mysql, { Pool } from 'mysql'


export let pool: Pool


var db_config = {
    connectTimeout: 10000,
    waitForConnections: true,
    connectionLimit: 30,
    host: '192.168.20.6',
    port: 3311,
    user: 'tab',
    password: 'kn11t000o_i5',
    database: 'muliaabadi_baru',
    multipleStatements: true
};

function handleDisconnect() {
    pool = mysql.createPool(db_config);
    pool.getConnection(
        function (err, connection) {
            if (err) {
                connection?.release();
                throw err;
            }

            connection?.release()
        })
}

handleDisconnect();

