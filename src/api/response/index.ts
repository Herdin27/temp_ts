import { Response } from "express"
import { DumpError } from "../../utils"

export const ResponseOk = (data: any, res: Response) => {
    return res.status(200).send({
        status: 'SUCCESS',
        message: data
    })
}

export const ResponseError = (data: any, res: Response) => {
    if (data) {
        return res.status(404).send({
            status: 'FAILED',
            message: data
        })
    }
    return ResponseNetworkError('Parameter data is null! ERROR', res)
}

export const ResponseNetworkError = (data: any, res: Response): void | any => {
    if (data) {
        DumpError(JSON.stringify(data))
        return res.status(505).send({
            status: 'NETWORK ERROR',
            message: 'Errors from the Server !'
        })
    }
    DumpError(new Error('Parameter data is null!, NetworkError'))
    return ResponseNetworkError('Parameter data is null!', res)
}