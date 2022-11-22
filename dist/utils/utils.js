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
exports.decodedToken = exports.rollback = exports.commit = exports.starttransaction = exports.dumpError = exports.responseOK = exports.query = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
/**
 *
 * this function for execute query
 *
 * @param query
 * @param params
 * @returns
 */
const query = (query, params) => {
    return new Promise((resolve, reject) => {
        config_1.pool.query(query, params, (error, rows, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw reject(error);
            resolve({ rows, fields });
        }));
    });
};
exports.query = query;
/**
 *
 * this function for handle response and handle error insert to databases
 *
 * @param values
 * @param status
 * @param res
 * @returns
 */
const responseOK = (values, status, res) => __awaiter(void 0, void 0, void 0, function* () {
    let msg;
    const data = {
        status: status,
        values: values
    };
    const handle = {
        host: res.req.rawHeaders,
        method: res.req.method,
        url: res.req.url,
        file: __dirname.slice(0, -4) + res.req.url + ".js",
    };
    msg = data.values.pesan;
    if (data.values.status === 'GAGAL') {
        yield (0, exports.query)(`INSERT INTO monitor_log_error VALUES(?, ?, ?, NOW())`, [
            handle.file,
            handle.url,
            JSON.stringify(msg) + msg,
        ]);
        return res.status(data.status).send(data);
    }
    return res.status(data.status).send(data);
});
exports.responseOK = responseOK;
/**
 *
 * @param err
 *
 * this funstion for describe error
 */
const dumpError = (err) => {
    if (typeof err === "object") {
        if (err) {
            console.log(err);
            console.log("\nMessage: " + err);
        }
        if (err.stack) {
            console.log("\nStacktrace:");
            console.log("====================");
            console.log(err.stack);
        }
    }
    else {
        console.log(err);
    }
};
exports.dumpError = dumpError;
/**
 * this function for start transaction sql query
 */
const starttransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.query)("START TRANSACTION");
});
exports.starttransaction = starttransaction;
/**
 * this function for commit finist start transaction
 */
const commit = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.query)("COMMIT");
});
exports.commit = commit;
/**
 * this function for error sql start transaction rollback
 */
const rollback = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.query)("ROLLBACK");
});
exports.rollback = rollback;
/**
 *
 * this function for decoded token jwt
 *
 * @param req
 * @returns
 */
const decodedToken = (req) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = (0, jsonwebtoken_1.verify)(token, 'process.env.TOKEN_KEY');
    return decoded;
};
exports.decodedToken = decodedToken;
