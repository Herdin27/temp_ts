import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import resIp from 'request-ip';
import express from 'express';
import chalk from "chalk";
import Cors from 'cors';
import 'dotenv/config'
import { RoutesLoader } from '../src/loader/ExpressLoader';
import path from 'path';
import { connectToDatabase } from '../src/database/MysqlConfig';

interface Props {
    port?: number,
    cors?: boolean,
    reqIp?: boolean,
    cookies?: boolean,
    bodyparser?: boolean,
    routePrefix?: string,
    LogConnectionToDB?: boolean
}

export const BootstrapModule = (
    {
        port,
        cors,
        reqIp,
        cookies,
        bodyparser,
        routePrefix,
        LogConnectionToDB
    }: Props
): Promise<unknown> => {

    const app: express.Express = express()

    return new Promise(async function (resolve, reject) {
        try {
            LogConnectionToDB && connectToDatabase(true)
            cors && app.use(Cors())
            reqIp && app.use(resIp.mw())
            cookies && app.use(cookieParser())
            bodyparser && app.use(bodyParser.urlencoded({ extended: true }))

            routePrefix
                ? app.use(routePrefix, RoutesLoader(path.join(__dirname.replace('common', 'src'), '/api/controllers/'), true))
                : app.use(RoutesLoader(path.join(__dirname.replace('common', 'src'), '/api/controllers/'), true));

            app.get('/', async (req, res) => {
                res.send('test')
            })
            resolve(app.listen(process.env.PORT || port, () => {
                console.log(
                    chalk.red(`Running`),
                    chalk.green(`${chalk.white(`on PORT`)} ${chalk.blue(process.env.PORT || port)}`)
                )
            }))
        } catch (error) {
            reject(error)
        }
    })
}