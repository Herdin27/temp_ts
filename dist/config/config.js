"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql_1 = __importDefault(require("mysql"));
var db_config = {
    connectTimeout: 10000,
    waitForConnections: true,
    connectionLimit: 30,
    host: process.env.HOST_NAME,
    port: process.env.PORT_DB,
    user: 'tab',
    password: process.env.SECRET,
    database: process.env.DB_NAME,
    multipleStatements: true
};
function handleDisconnect() {
    exports.pool = mysql_1.default.createPool(db_config);
    exports.pool.getConnection(function (err, connection) {
        if (err) {
            connection === null || connection === void 0 ? void 0 : connection.release();
            throw err;
        }
        connection === null || connection === void 0 ? void 0 : connection.release();
    });
}
handleDisconnect();
