import { Request, Response } from 'express';
import BaseController from '../../core/extends/BaseController';
import HttpResponses from '../../core/utils/HttpResponses';
import { plainToClass } from 'class-transformer';
import MessageCreateBody from '../dtos/messageCreate.dto';
import MessageService from '../services/message.service';
import User from '../models/User';
import Channel from '../models/Channel';
import Guild from '../models/Guild';
import GuildService from '../services/guild.service';
import GuildMember from '../models/GuildMember';
import ChannelService from '../services/channel.service';

export default class ChannelController extends BaseController {
  public constructor(private readonly messageService = new MessageService(), private readonly guildService = new GuildService(), private readonly channelService = new ChannelService()) {
    super();

    this.createMessage = this.createMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  public async createMessage(req: Request, res: Response) {
    try {
      if (!res.locals.id) return HttpResponses.Unauthorized(res);

      const channelId = req.params.id;
      if (!channelId) return HttpResponses.BadRequest(res);

      let body = req.body;
      if (!body) return HttpResponses.BadRequest(res);
      body = plainToClass(MessageCreateBody, body);

      const author = await User.findOne({ id: res.locals.id });
      if (!author) return HttpResponses.Unauthorized(res);

      const channel = await Channel.findOne({ id: channelId });
      if (!channel) return HttpResponses.NotFound(res);

      const guild = await Guild.findOne({ id: channel.guildId });
      if (!guild) return HttpResponses.NotFound(res);
      if (!(await this.guildService.userIsMemberFromGuild(author.id, guild.id))) return HttpResponses.NotFound(res);
      const member = await GuildMember.findOne({ id: author.id, guildId: guild.id });
      if (!member) return HttpResponses.Unauthorized(res);

      const msg = await this.messageService.createMessage(body, channelId, res.locals.id, member._id, guild.id);
      return res.status(201).send({
        id: msg?.id
      });
    } catch (err) {
      console.log('Failed to create message: ', err);
      return HttpResponses.InternalServerError(res);
    }
  }

  public async getMessages(req: Request, res: Response) {
    try {
      const channelId = req.params.id;
      if (!channelId) return HttpResponses.BadRequest(res);

      const msgs = await this.messageService.getMessagesFromChannel(channelId);
      return res.status(200).send({
        messages: msgs
      });
    } catch (err) {
      console.log('Failed to get messages: ', err);
      return HttpResponses.InternalServerError(res);
    }
  }

  public async deleteMessage(req: Request, res: Response) {
    try {
      const channelId = req.params.channelId;
      const messageId = req.params.messageId;

      if(!channelId || !messageId) return HttpResponses.BadRequest(res);

      const channel = await this.channelService.findOne({ id: channelId });
      if(!channel || !(await this.messageService.findOne({ id: messageId}))) return HttpResponses.NotFound(res);
      if(!(await this.guildService.userIsMemberFromGuild(res.locals.id, channel.guildId))) return HttpResponses.Unauthorized(res);

      const id = await this.messageService.deleteOne({ id: messageId });
      return res.status(200).send({ id });
    } catch(err) {
      console.log('Failed to delete message: ', err);
      return HttpResponses.InternalServerError(res);
    }
  }
}
