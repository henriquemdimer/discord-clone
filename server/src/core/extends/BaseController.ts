import { ValidationError } from 'class-validator';
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

    public parseErrors(errors: ValidationError[]) {
        if (!errors || errors.length < 1) return [];

        const parsedErrors = [];
        for (const err of errors) {
            parsedErrors.push({ field: err.property, errors: Object.values(err.constraints || {}) });
        }

        return parsedErrors;
    }
}