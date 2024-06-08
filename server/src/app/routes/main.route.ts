import { Router } from 'express';
import BaseRoute, { IBaseRoute } from '../../core/extends/BaseRoute';
import MainController from '../controllers/main.controller';

export default class MainRoute extends BaseRoute implements IBaseRoute {
  public constructor(private readonly mainController = new MainController()) {
    super('/');
  }

  public init(router: Router) {
    router.get('/', this.mainController.checkHealth);
    return router;
  }
}