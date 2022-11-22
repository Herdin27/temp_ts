import { Router } from 'express'
import { dumpError, responseOK, query } from '../../utils/utils'
const router = Router()

router.get('/', async ({ req, res }: any) => {
    try {
        const data: any = await query(`select * from soal_web_test`)
        return responseOK({ values: 'SUKSES', pesan: data.rows }, 200, res)
    } catch (error) {
        dumpError(error)
        return responseOK({ values: 'GAGAL', pesan: error }, 200, res)
    }
})

export = router