import { Router } from 'express'

export function BaseRoute(url: string, method: string, funcky: any) {
    return (): any => {
        const router: any = Router()
        router[method](url, async (req: any, res: any) => funcky)
    };
}