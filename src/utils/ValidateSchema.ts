import Ajv from "ajv"
import { JTDDataType } from "ajv/dist/core"
import { OutValidateSchema } from "../types"

const ajv = new Ajv()

export const ValidateSchema = (Schema: any, dataDto: string[] | object | object[]): OutValidateSchema => {

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