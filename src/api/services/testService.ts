import { MysqlError } from "mysql"
import { TempMuat } from "../interface"
import { DumpError } from "../../utils"
import { Request, Response } from "express"
import { TestSchemaType } from "../schema/testSchema"
import { ValidateSchema } from "../../utils/ValidateSchema"
import { ResponseError, ResponseNetworkError, ResponseOk } from "../response"
import { connectToDatabase } from "../../database/MysqlConfig"
const db = connectToDatabase()

export const TestServiceModule = async (req: Request<any>, res: Response<any, Record<string, any>>) => {
    try {
        const { validate, data } = ValidateSchema(TestSchemaType, {
            foo: Number(req.query.foo)
        })
        if (!validate) return ResponseNetworkError(data, res)

        db.query('select * from temp_muat', (err: MysqlError, rows: TempMuat[]) => {
            if (err) return ResponseNetworkError(err, res)
            return ResponseOk(rows, res)
        })
    } catch (error: any) {
        DumpError(error)
        return ResponseNetworkError(error.sqlMessage, res)
    }
}