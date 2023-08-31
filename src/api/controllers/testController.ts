import { ResponseOk } from "../response";
import { TextService } from "../services/TextService";

export default function (router: any) {

    //@Get('/test')
    router.get('/test', async (req: any, res: any) => {
        return ResponseOk(await TextService(req), res);
    })

    return router;
}
