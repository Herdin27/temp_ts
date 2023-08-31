import { verify } from "jsonwebtoken";
import { DumpError } from "../../utils/utils";

exports.auth = async ({ req, res, next }: any) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]
    if (!authHeader) {
        return res.status(401).send({ message: "Access denied" })
    }
    try {
        const verified = verify(token, 'process.env.TOKEN_KEY')
        req.user = verified
        return next()
    } catch (error) {
        DumpError(error)
        return res.status(400).send({ message: 'Invalid token' })
    }
};