import { verify } from "jsonwebtoken";
import { DumpError } from "../../utils";
import { NextFunction, Request, Response } from "express";
import { ResponseUnAuthorized } from "../services/response";

export const Auth = async (req: Request, res: Response, next: NextFunction): Promise<Response | NextFunction | void> => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]
    if (!authHeader) {
        return ResponseUnAuthorized(res)
    }
    try {
        const verified = verify(String(token), 'process.env.TOKEN_KEY')
        res.set('user', String(verified));
        return next()
    } catch (error: any) {
        DumpError(error)
        return ResponseUnAuthorized(res, 'Invalid Token !')
    }
};