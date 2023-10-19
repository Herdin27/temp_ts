export interface ResponseTestData {
    no: number,
    no_order: string,
    tanggal: string,
    id_karyawan: number,
    status: number,
    no_mobil: string
}

export interface RequestTestData {
    foo: number
    bar?: string
}

export interface Props {
    port?: number,
    cors?: boolean,
    reqIp?: boolean,
    cookies?: boolean,
    bodyparser?: boolean,
    routePrefix?: string,
    LogConnectionToDB?: boolean
}