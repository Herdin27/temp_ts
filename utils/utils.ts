import { verify } from "jsonwebtoken";
import { pool } from "../config/config";
/**
 * 
 * this function for execute query
 * 
 * @param query 
 * @param params 
 * @returns 
 */

export const query = (query: string, params?: string[] | number[] | any) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, async (error: any, rows: any, fields: any) => {
            if (error) throw reject(error);
            resolve({ rows, fields })
        })
    })
}

/**
 * 
 * this function for handle response and handle error insert to databases
 * 
 * @param values 
 * @param status 
 * @param res 
 * @returns 
 */
export const responseOK = async (values: any, status: number, res: any) => {
    let msg: any
    interface components {
        host: any
        method: any,
        url: any,
        file: any
    }
    const data = {
        status: status,
        values: values
    }

    const handle: components = {
        host: res.req.rawHeaders,
        method: res.req.method,
        url: res.req.url,
        file: __dirname.slice(0, -4) + res.req.url + ".js",
    };

    msg = data.values.pesan

    if (data.values.status === 'GAGAL') {
        await query(`INSERT INTO monitor_log_error VALUES(?, ?, ?, NOW())`, [
            handle.file,
            handle.url,
            JSON.stringify(msg) + msg,
        ]);
        return res.status(data.status).send(data);
    }
    return res.status(data.status).send(data);
}


/**
 * 
 * @param err 
 * 
 * this funstion for describe error
 */
export const dumpError = (err: any) => {
    if (typeof err === "object") {
        if (err) {
            console.log(err);
            console.log("\nMessage: " + err);
        }
        if (err.stack) {
            console.log("\nStacktrace:");
            console.log("====================");
            console.log(err.stack);
        }
    } else {
        console.log(err);
    }
}


/**
 * this function for start transaction sql query
 */
export const starttransaction = async () => {
    await query("START TRANSACTION")
}

/**
 * this function for commit finist start transaction
 */
export const commit = async () => {
    await query("COMMIT")
}

/**
 * this function for error sql start transaction rollback
 */
export const rollback = async () => {
    await query("ROLLBACK")
}

/**
 * 
 * this function for decoded token jwt 
 * 
 * @param req 
 * @returns 
 */

export const decodedToken = (req: any): object | string | string[] => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = verify(token, 'process.env.TOKEN_KEY')
    return decoded
}