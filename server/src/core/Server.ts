import Express from 'express';
import { promises as fs } from 'node:fs';
import Database from './Database';
import bodyParser from 'body-parser';
import { IBaseRoute } from './extends/BaseRoute';

export default class Server {
    public app = Express();
    public port: number;

    public constructor(port = 8080) {
        this.port = port;
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    public async initRoutes() {
        const routes = await fs.readdir('src/app/routes');
        if (routes.length) {
            for (const TRoute of routes) {
                const Route = await import(`../app/routes/${TRoute}`);
                const route: IBaseRoute = new Route.default();

                const router = Express.Router();
                this.app.use(route.path, route.init(router));
            }
        }
    }

    public async initDatabase() {
        const database = new Database();
        await database.init();
    }

    public init() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            await this.initDatabase();
            await this.initRoutes();

            this.app.listen(this.port, () => {
                resolve(this.port);
            });
        });
    }
}