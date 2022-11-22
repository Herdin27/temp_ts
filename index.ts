import cookieParser from 'cookie-parser'
import router from './src/routes/routes'
import bodyParser from 'body-parser';
import resIp from 'request-ip';
import express from 'express'
import cors from 'cors';
import 'dotenv/config'

interface components {
    app: any,
    port: string | number,
    program?: string
}

let func: components = {
    app: express(),
    port: 7003,
    program: 'test'
}

const {
    app,
    port,
    program,
} = func

app.use(cors())
app.use(resIp.mw())
app.use(cookieParser())
app.use(`/api/${program}`, router)
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => {
    console.log(`${program}:${port} || ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
})