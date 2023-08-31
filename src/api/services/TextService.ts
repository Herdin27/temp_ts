import { Query } from "../../utils/utils"


export const TextService = async (req: any) => {
    try {
        const chekdata: any = await Query('select * from  temp_muat')
        return chekdata.rows
    } catch (error: any) {
        return error
    }
}