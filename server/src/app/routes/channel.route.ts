import { Router } from "express";
import BaseRoute, { IBaseRoute } from "../../core/extends/BaseRoute";
import AuthMiddleware from "../../core/middlewares/Auth";
import ChannelController from "../controllers/channel.controller";

export default class ChannelRoute extends BaseRoute implements IBaseRoute {
  public constructor(public channelController = new ChannelController()) {
    super('/channels', AuthMiddleware);
  }

  public init(router: Router) {
    router.post('/:id/messages', this.channelController.createMessage);
    router.get('/:id/messages', this.channelController.getMessages);
    return router;
  }
}
