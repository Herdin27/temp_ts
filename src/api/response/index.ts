export const ResponseOk = (funcky: any, res: any) => {
    return res.status(200).send(funcky)
}

export const ResponseError = (funcky: string, res: any) => {
    return res.status(404).send(funcky)
}