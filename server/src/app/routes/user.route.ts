import { Router } from 'express';
import BaseRoute, { IBaseRoute } from '../../core/extends/BaseRoute';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../../core/middlewares/Auth';

export default class UserRoute extends BaseRoute implements IBaseRoute {
    public constructor(private readonly userController = new UserController()) {
        super('/users');
    }

    public init(router: Router) {
        router.get('/@me', AuthMiddleware, this.userController.getMe);
        return router;
    }
}