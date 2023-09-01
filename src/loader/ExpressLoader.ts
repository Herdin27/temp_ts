import { Router } from "express";
import * as fs from 'fs'
import path from "path";


export function RoutesLoader(loadPath: string, recursive: boolean): Router {

    let router = Router();

    if (!loadPath) loadPath = './controllers';

    const walk = (dir: string) => {
        let results: string[] = [];
        const list = fs.readdirSync(dir)
        list.forEach((file: string) => {
            file = dir + '/' + file
            const stat = fs.statSync(file)
            if (stat && stat.isDirectory()) {
                results = results.concat(walk(file));
            } else {
                results.push(file);
            }
        })
        return results;
    }

    const files = (recursive ? walk(loadPath) : fs.readdirSync(loadPath));

    for (const entry of files) {

        const file = (recursive ? path.resolve(entry) : path.resolve(loadPath, entry))

        if (fs.statSync(file).isFile() &&
            ['.js', '.ts'].indexOf(path.extname(file).toLowerCase()) !== -1 &&
            path.basename(file).slice(0, 1) !== '.') {
            try {
                const r = require(file);
                router = (r.default || r)(router);
            } catch (e: any) {
                throw new Error("Error when loading route file: " + file + " [" + e.toString() + "]");
            }
        }

    }

    return router;
}