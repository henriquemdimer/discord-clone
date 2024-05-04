import { Router } from "express";
import BaseRoute, { IBaseRoute } from "../../core/extends/BaseRoute";
import AuthMiddleware from "../../core/middlewares/Auth";


export default class ChannelRoute extends BaseRoute implements IBaseRoute {
  public constructor() {
    super('/channels', AuthMiddleware);
  }

  public init(router: Router) {
    router.post('/');
    return router;
  }
}
