import Ajv from "ajv"
import { JTDDataType } from "ajv/dist/core"

const ajv = new Ajv()

export const ValidateSchema = (Schema: any, dataDto: any): { validate: boolean, data: any } => {

    type MyData = JTDDataType<typeof Schema>
    const validate: any = ajv.compile<MyData>(Schema)

    switch (validate(dataDto)) {
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