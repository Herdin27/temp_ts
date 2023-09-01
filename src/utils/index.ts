import { verify } from "jsonwebtoken";
import { connectToDatabase } from "../api/database/MysqlConfig";
import chalk from "chalk";

/**
 * 
 * this function for execute query
 * 
 * @param query 
 * @param params 
 * @returns 
 */

export const Query = (query: string, params?: string[] | number[] | any) => {
    return new Promise((resolve, reject) => {
        connectToDatabase().query(query, params, async (error: any, rows: any, fields: any) => {
            if (error) throw reject(error);
            resolve({ rows, fields })
        })
    })
}

/**
 * 
 * @param err 
 * 
 * this funstion for describe error
 */
export const DumpError = (err: unknown | any) => {
    if (typeof err === "object") {
        if (err) {
            console.log(chalk.red(err));
            console.log(chalk.red("\nMessage: " + err));
        }
        if (err.stack) {
            console.log("\nStacktrace:");
            console.log("====================");
            console.log(chalk.red(err.stack));
        }
    } else {
        console.log(chalk.red(err));
    }
}


/**
 * this function for start transaction sql query
 */
export const StartTransaction = async () => {
    await Query("START TRANSACTION")
}

/**
 * this function for commit finist start transaction
 */
export const Commit = async () => {
    await Query("COMMIT")
}

/**
 * this function for error sql start transaction rollback
 */
export const Rollback = async () => {
    await Query("ROLLBACK")
}

/**
 * 
 * this function for decoded token jwt 
 * 
 * @param req 
 * @returns 
 */

export const DecodedToken = (req: any): object | string | string[] => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = verify(token, 'process.env.TOKEN_KEY')
    return decoded
}