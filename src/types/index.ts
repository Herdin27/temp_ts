import { ResponseTestData } from "../interface"

export type OutValidateSchema = { validate: boolean, data: string | string[] | number[] }
export type DataResponseSukses = { data: string[] | number[] | string | number | ResponseTestData[] | ResponseTestData }
