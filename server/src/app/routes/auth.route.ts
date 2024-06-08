import { Router } from 'express';
import BaseRoute, { IBaseRoute } from '../../core/extends/BaseRoute';
import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../../core/middlewares/Auth';

export default class AuthRoute extends BaseRoute implements IBaseRoute {
  public constructor(private readonly authController = new AuthController()) {
    super('/auth');
  }

  public init(router: Router) {
    router.post('/login', this.authController.loginAccount);
    router.post('/register', this.authController.registerAccount);
    router.delete('/', AuthMiddleware, this.authController.deleteAccount);
    return router;
  }
}