/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateOrReject } from 'class-validator';
import IdGenerator from '../../core/utils/IdGenerator';
import ChannelCreateBody from '../dtos/channelCreate.dto';
import Channel from '../models/Channel';
import GuildService from './guild.service';
import Gateway from '../../core/Websocket';

/*
 Channel Types: 
 0 Category
 1 Text Channel
 2 Voice Channel
*/
const CHANNEL_TYPES = [0, 1, 2];

export default class ChannelService {
  public constructor(private readonly guildService = new GuildService()) { }

  public async create(body: ChannelCreateBody, guildId: string) {
    if (!body || !guildId) throw new Error('Missing body or guild id');
    await validateOrReject(body);

    const guild = await this.guildService.find({ id: guildId });
    if (!guild) throw new Error('Guild not found');
    if (!CHANNEL_TYPES.includes(body.type)) throw new Error('Invalid channel type');

    if (body.parentId) {
      const parent = await Channel.find({ id: body.parentId });
      if (!parent) throw new Error('Parent not found');
    }

    const channel = await Channel.create({
      id: await IdGenerator.generateId(Channel),
      name: body.name.trim().split(' ').join('-'),
      guildId,
      guild: guild._id,
      parentId: body.type == 0 ? undefined : body.parentId,
      type: body.type
    });

    Gateway.broadcastEventTo(guildId, 'CHANNEL_CREATE', await this.find({ id: channel.id }));
    return channel.id;
  }

  public async getChannels(guildId: string) {
    if (!guildId) throw new Error('Missing guild id');

    return await Channel.find({ guildId }).populate('guild');
  }

  public async find(query: any, select?: string) {
    return await Channel.findOne(query).select(select || '').populate('guild');
  }
}
