import { Response } from "express"
import { DumpError } from "../../../utils"
import { DataResponseSukses, OutValidateSchema } from "../../../types"

export const ResponseOk = (data: DataResponseSukses['data'], res: Response): Response => {
    return res.status(200).send({
        status: 'SUCCESS',
        message: data
    })
}

export const ResponseError = (data: Error | string, res: Response): Response => {
    if (data) {
        DumpError(new Error(String(data)))
        return res.status(400).send({
            status: 'FAILED',
            message: data
        })
    }
    return ResponseNetworkError('Parameter data is null! ERROR', res)
}

export const ResponseUnAuthorized = (res: Response, data?: string): Response => {
    DumpError(new Error(data))
    return res.status(401).send({
        status: 'FAILED',
        message: "Error Unauthorized !"
    })
}

export const ResponseNetworkError = (data: Error | string | OutValidateSchema, res: Response): Response => {
    if (data) {
        DumpError(new Error(String(data)))
        return res.status(500).send({
            status: 'NETWORK ERROR',
            message: 'Errors from the Server !'
        })
    }
    DumpError(new Error('Parameter data is null!, NetworkError'))
    return ResponseNetworkError('Parameter data is null!', res)
}