import { JSONSchemaType } from "ajv"
import { RequestTestData, ResponseTestData } from "../interface"

export const RequestTestSchema: JSONSchemaType<RequestTestData> = {
    type: "object",
    properties: {
        foo: { type: "number" },
        bar: { type: "string", nullable: true }
    },
    required: ["foo"],
    additionalProperties: false
}

export const ResponseTestSchema: JSONSchemaType<ResponseTestData> = {
    type: "object",
    properties: {
        no: { type: "number" },
        no_order: { type: "string" },
        tanggal: { type: "string" },
        id_karyawan: { type: "number" },
        status: { type: "number" },
        no_mobil: { type: "string" }
    },
    required: ["no"],
    additionalProperties: false
}