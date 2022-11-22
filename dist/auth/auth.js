"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("../utils/utils");
exports.auth = ({ req, res, next }) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(' ')[1];
    if (!authHeader) {
        return res.status(401).send({ message: "Access denied" });
    }
    try {
        const verified = (0, jsonwebtoken_1.verify)(token, 'process.env.TOKEN_KEY');
        req.user = verified;
        return next();
    }
    catch (error) {
        (0, utils_1.dumpError)(error);
        return res.status(400).send({ message: 'Invalid token' });
    }
});
