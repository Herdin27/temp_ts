import { Response } from "express"
import { DumpError } from "../../../utils"

export const ResponseOk = (data: any, res: Response): Response => {
    return res.status(200).send({
        status: 'SUCCESS',
        message: data
    })
}

export const ResponseError = (data: any, res: Response): Response => {
    if (data) {
        DumpError(new Error(data))
        return res.status(400).send({
            status: 'FAILED',
            message: data
        })
    }
    return ResponseNetworkError('Parameter data is null! ERROR', res)
}

export const ResponseUnAuthorized = (data: any, res: Response): Response => {
    if (data) {
        DumpError(new Error(data))
        return res.status(401).send({
            status: 'FAILED',
            message: "Error Unauthorized !"
        })
    }
    return ResponseNetworkError('Parameter data is null! ERROR', res)
}

export const ResponseNetworkError = (data: any, res: Response): Response => {
    if (data) {
        DumpError(new Error(data))
        return res.status(500).send({
            status: 'NETWORK ERROR',
            message: 'Errors from the Server !'
        })
    }
    DumpError(new Error('Parameter data is null!, NetworkError'))
    return ResponseNetworkError('Parameter data is null!', res)
}