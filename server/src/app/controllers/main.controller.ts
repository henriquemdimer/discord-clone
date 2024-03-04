import { Request, Response } from 'express';
import BaseController from '../../core/extends/BaseController';

export default class MainController extends BaseController {
    public constructor() {
        super();
    }

    public checkHealth(req: Request, res: Response) {
        return res.status(200).send('All systems operational');
    }
}