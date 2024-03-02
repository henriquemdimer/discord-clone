import Express from 'express';
import { promises as fs } from 'node:fs';
import { IBaseController } from './extends/BaseController';
import Database from './Database';
import bodyParser from 'body-parser';

export default class Server {
    public app = Express();
    public port: number;

    public constructor(port = 8080) {
        this.port = port;
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    public async initControllers() {
        const routes = await fs.readdir('src/app/controllers');
        if (routes.length) {
            for (const TController of routes) {
                const Controller = await import(`../app/controllers/${TController}`);
                const controller: IBaseController = new Controller.default();

                const router = Express.Router();
                this.app.use(controller.path, controller.init(router));
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
            await this.initControllers();

            this.app.listen(this.port, () => {
                resolve(this.port);
            });
        });
    }
}