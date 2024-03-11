/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';

export interface IBaseRoute {
    path: string;
    middlewares?: any[];

    init: (router: Router) => Router;
}

export default class BaseRoute {
    public path: string;
    public middlewares?: any[];

    public constructor(path: string, ...middlewares: any[]) {
        this.path = path;
        this.middlewares = middlewares;
    }
}