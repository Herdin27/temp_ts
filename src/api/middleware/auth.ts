import { JwtPayload, verify } from "jsonwebtoken";
import { DumpError } from "../../utils";
import { NextFunction, Request, Response } from "express";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization")
    const token: string | undefined = authHeader && authHeader.split(' ')[1]
    if (!authHeader) {
        return res.status(401).send({ message: "Access denied" })
    }
    try {
        const verified: string | JwtPayload = verify(String(token), 'process.env.TOKEN_KEY')
        res.set('user', String(verified));
        return next()
    } catch (error) {
        DumpError(error)
        return res.status(400).send({ message: 'Invalid token' })
    }
};