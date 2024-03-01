import Express from 'express';
import { promises as fs } from 'node:fs';
import { IBaseController } from './extends/BaseRoute';

export default class Server {
    public app = Express();
    public port: number;

    public constructor(port = 8080) {
        this.port = port;
    }

    public async initRoutes() {
        const routes = await fs.readdir('src/app/controllers');
        if (routes.length) {
            for (const TController of routes) {
                const Controller = await import(`../app/controllers/${TController}`);
                const controller: IBaseController = new Controller.default();

                const router = Express.Router();
                this.app.use('/', controller.init(router));
            }
        }
    }

    public init() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            await this.initRoutes();
            this.app.listen(this.port, () => {
                resolve(this.port);
            });
        });
    }
}