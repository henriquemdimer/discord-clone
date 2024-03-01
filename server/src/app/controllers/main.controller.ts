import { Router } from 'express';
import BaseController, { IBaseController } from '../../core/extends/BaseRoute';

export default class MainController extends BaseController implements IBaseController {
    public constructor() {
        super('/');
    }

    public init(router: Router) {
        router.get('/', (req, res) => {
            res.send('Hello World');
        });

        router.get('/test', (req, res) => {
            res.send('Hello world from /test');
        });

        return router;
    }
}