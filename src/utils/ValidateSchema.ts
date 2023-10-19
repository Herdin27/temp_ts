import Ajv from "ajv"
import { JSONSchemaType, JTDDataType } from "ajv/dist/core"
import { OutValidateSchema } from "../types"
import { RequestTestData } from "../interface"

const ajv = new Ajv()

export const ValidateSchema = (Schema: JSONSchemaType<RequestTestData> | string[] | number[], dataDto: string[] | object | object[]): OutValidateSchema => {

    type MyData = JTDDataType<typeof Schema>
    const validate = ajv.compile<MyData>(Schema)

    switch (Boolean(validate(dataDto))) {
        case true:
            return {
                validate: true,
                data: String(dataDto)
            }
        default:
            return {
                validate: false,
                data: String(validate.errors)
            }
    }
}