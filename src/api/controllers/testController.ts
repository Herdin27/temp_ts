import { Request, Response, Router } from "express";
import { TestServiceModule } from "../services/testService";

export default function (router: Router) {

    //@Get('/test')
    router.get('/test', async (req: Request, res: Response) => {
        return await TestServiceModule(req, res)
    })

    return router;
}
