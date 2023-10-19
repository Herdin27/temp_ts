import { MysqlError } from "mysql"
import { DumpError } from "../../utils"
import { Request, Response } from "express"
import { db } from "../../database/MysqlConfig"
import { ResponseTestData } from "../../interface"
import { ValidateSchema } from "../../utils/ValidateSchema"
import { RequestTestSchema, ResponseTestSchema } from "./schema/testSchema"
import { ResponseNetworkError, ResponseOk } from "./response"
import { OutValidateSchema } from "../../types"

export const TestServiceModule = async (req: Request<object>, res: Response<object, Record<string, object>>) => {
    try {
        const { validate, data }: OutValidateSchema = ValidateSchema(RequestTestSchema, {
            foo: Number(req.query.foo)
        })
        if (!validate) return ResponseNetworkError(String(data), res)

        db.query('select * from temp_muat', (err: MysqlError, rows: ResponseTestData[]) => {
            if (err) return ResponseNetworkError(err, res)
            for (const i in rows) {
                const { validate, data }: OutValidateSchema = ValidateSchema(ResponseTestSchema, {
                    ...rows[i],
                    tanggal: String(rows[i].tanggal)
                })
                if (!validate) return ResponseNetworkError(String(data), res)
            }
            return ResponseOk(rows, res)
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Inside this block, err is known to be a ValidationError
            DumpError(new Error(String(error)))
            return ResponseNetworkError(error.message, res)
        }

    }
}