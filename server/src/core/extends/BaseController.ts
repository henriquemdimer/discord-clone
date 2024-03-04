import { ValidationError } from 'class-validator';

export default class BaseController {
    public parseErrors(errors: ValidationError[]) {
        if (!errors || errors.length < 1) return [];

        const parsedErrors = [];
        for (const err of errors) {
            parsedErrors.push({ field: err.property, errors: Object.values(err.constraints || {}) });
        }

        return parsedErrors;
    }
}