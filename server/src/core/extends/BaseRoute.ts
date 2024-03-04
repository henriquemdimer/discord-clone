import { Router } from 'express';

export interface IBaseRoute {
    path: string;

    init: (router: Router) => Router;
}

export default class BaseRoute {
    public path: string;

    public constructor(path: string) {
        this.path = path;
    }
}