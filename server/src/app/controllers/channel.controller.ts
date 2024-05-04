import { Request, Response } from "express";
import BaseController from "../../core/extends/BaseController";
import HttpResponses from "../../core/utils/HttpResponses";
import ChannelService from "../services/channel.service";

export default class ChannelController extends BaseController {
  public constructor(private readonly channelService = new ChannelService()) {
    super();

    this.create = this.create.bind(this);
  }

  public async create(req: Request, res: Response) {
    try {
      if (!res.locals.id) return HttpResponses.Unauthorized(res);

    } catch (err) {
      console.log('Failed to create channel: ', err);
      return HttpResponses.InternalServerError(res);
    }
  }
}
