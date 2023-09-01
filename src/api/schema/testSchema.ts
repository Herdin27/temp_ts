import { JSONSchemaType } from "ajv"

interface TestData {
    foo: number
    bar?: string
}

export const TestSchemaType: JSONSchemaType<TestData> = {
    type: "object",
    properties: {
        foo: { type: "number" },
        bar: { type: "string", nullable: true }
    },
    required: ["foo"],
    additionalProperties: false
}