"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./src/routes/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const request_ip_1 = __importDefault(require("request-ip"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
let func = {
    app: (0, express_1.default)(),
    port: 7003,
    program: 'test'
};
const { app, port, program, } = func;
app.use((0, cors_1.default)());
app.use(request_ip_1.default.mw());
app.use((0, cookie_parser_1.default)());
app.use(`/api/${program}`, routes_1.default);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`${program}:${port} || ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
});
