import { MysqlError } from "mysql"
import { DumpError } from "../../utils"
import { Request, Response } from "express"
import { db } from "../../database/MysqlConfig"
import { ResponseTestData } from "../../interface"
import { ValidateSchema } from "../../utils/ValidateSchema"
import { RequestTestSchema, ResponseTestSchema } from "./schema/testSchema"
import { ResponseError, ResponseNetworkError, ResponseOk } from "./response"
import { OutValidateSchema } from "../../types"

export const TestServiceModule = async (req: Request<any>, res: Response<any, Record<string, any>>) => {
    try {
        const { validate, data }: OutValidateSchema = ValidateSchema(RequestTestSchema, {
            foo: Number(req.query.foo)
        })
        if (!validate) return ResponseNetworkError(data, res)

        db.query('select * from temp_muat', (err: MysqlError, rows: ResponseTestData[]) => {
            if (err) return ResponseNetworkError(err, res)
            for (let i in rows) {
                const { validate, data }: OutValidateSchema = ValidateSchema(ResponseTestSchema, {
                    ...rows[i],
                    tanggal: String(rows[i].tanggal)
                })
                if (!validate) return ResponseNetworkError(data, res)
            }
            return ResponseOk(rows, res)
        })
    } catch (error: any) {
        DumpError(error)
        return ResponseNetworkError(error.sqlMessage, res)
    }
}