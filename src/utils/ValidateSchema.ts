import Ajv from "ajv"
import { JTDDataType } from "ajv/dist/core"

const ajv = new Ajv()

export const ValidateSchema = (Schema: any, dataDto: string[] | any): { validate: boolean, data: string | any } => {

    type MyData = JTDDataType<typeof Schema>
    const validate = ajv.compile<MyData>(Schema)

    switch (Boolean(validate(dataDto))) {
        case true:
            return {
                validate: true,
                data: dataDto
            }
        default:
            return {
                validate: false,
                data: validate.errors
            }
    }
}