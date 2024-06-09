/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateOrReject } from 'class-validator';
import MessageCreateBody from '../dtos/messageCreate.dto';
import Message from '../models/Message';
import IdGenerator from '../../core/utils/IdGenerator';
import GuildService from './guild.service';
import mongoose from 'mongoose';
import Gateway from '../../core/Websocket';

export default class MessageService {
  public constructor(private readonly guildService = new GuildService()) { }

  public async createMessage(body: MessageCreateBody, channelId: string, authorId: string, authorMemberId: mongoose.Types.ObjectId, guildId: string) {
    if (!body) throw new Error('Missing body');
    await validateOrReject(body);

    const msg = await Message.create({
      id: await IdGenerator.generateId(Message),
      content: body.content,
      channelId: channelId,
      guildId: guildId,
      authorId: authorId,
      author: authorMemberId
    });

    Gateway.broadcastEventTo(guildId, 'MESSAGE_CREATE', await this.findOne({ id: msg.id }));
    return msg.id;
  }

  public async getMessagesFromChannel(channelId: string) {
    if (!channelId) throw new Error('Missing channel id');

    return await Message.find({ channelId }).populate('author').populate({ path: 'author', populate: { path: 'user' } }).populate({ path: 'author', populate: { path: 'guild' } });
  }

  public async deleteOne(query: any) {
    const msg = await this.findOne(query);
    if(!msg) throw new Error('Message not found');

    await Message.deleteOne(query);
    Gateway.broadcastEventTo(msg.guildId, 'MESSAGE_DELETE', msg);
    
    return msg.id;
  }

  public async findOne(query: any, select?: string) {
    return await Message.findOne(query).select(select || '').populate('author').populate({ path: 'author', populate: { path: 'guild' } }).populate({ path: 'author', populate: { path: 'user' } });
  }
}
