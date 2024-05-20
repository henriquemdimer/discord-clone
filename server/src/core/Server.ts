import Express from 'express';
import { promises as fs } from 'node:fs';
import Database from './Database';
import bodyParser from 'body-parser';
import { IBaseRoute } from './extends/BaseRoute';
import cors from 'cors';
import Gateway from './Websocket';

export default class Server {
    public app = Express();
    public port: string;

    public constructor(port = '8080') {
        this.port = port;
    }

    public async initRoutes() {
        const routes = await fs.readdir('src/app/routes');
        if (routes.length) {
            for (const TRoute of routes) {
                const Route = await import(`../app/routes/${TRoute}`);
                const route: IBaseRoute = new Route.default();

                const router = Express.Router();

                if (route.middlewares) {
                    route.middlewares.forEach((middleware) => {
                        router.use(middleware);
                    });
                }

                this.app.use(route.path, route.init(router));
            }
        }
    }

    public async initDatabase() {
        const database = new Database();
        await database.init();
    }

    public initWebsocket() {
        Gateway.init();
        console.log(`Gateway running on port: ${Gateway.port}`);
    }

    public initMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: '*'
        }));
    }

    public init() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            this.initMiddlewares();
            await this.initDatabase();
            this.initWebsocket();
            await this.initRoutes();

            this.app.listen(this.port, () => {
                resolve(this.port);
            });
        });
    }
}
