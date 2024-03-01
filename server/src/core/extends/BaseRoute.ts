import { Router } from 'express';

export interface IBaseController {
    path: string;

    init: (router: Router) => Router;
}

export default class BaseController {
    public path: string;

    public constructor(path: string) {
        this.path = path;
    }
}