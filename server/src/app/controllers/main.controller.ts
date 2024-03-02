import { Router } from 'express';
import BaseController, { IBaseController } from '../../core/extends/BaseController';

export default class MainController extends BaseController implements IBaseController {
    public constructor() {
        super('/');
    }

    public init(router: Router) {
        router.get('/', (req, res) => {
            res.send('All systems operational.');
        });

        return router;
    }
}