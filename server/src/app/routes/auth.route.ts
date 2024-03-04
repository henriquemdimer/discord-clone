import { Router } from 'express';
import BaseRoute, { IBaseRoute } from '../../core/extends/BaseRoute';
import AuthController from '../controllers/auth.controller';

export default class AuthRoute extends BaseRoute implements IBaseRoute {
    public constructor(private readonly authController = new AuthController()) {
        super('/auth');
    }

    public init(router: Router) {
        router.post('/', this.authController.loginUser);
        return router;
    }
}