/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateOrReject } from 'class-validator';
import GuildCreateBody from '../dtos/guildCreate.dto';
import Guild from '../models/Guild';
import IdGenerator from '../../core/utils/IdGenerator';
import UserService from './user.service';
import GuildMember from '../models/GuildMember';
import ChannelService from './channel.service';
import { plainToClass } from 'class-transformer';
import ChannelCreateBody from '../dtos/channelCreate.dto';
import Gateway from '../../core/Websocket';

export interface IGuild {
    id: string;
    _id: string;
    name: string;
    ownerId: string;
    updatedAt: string;
    createdAt: string;
}

export default class GuildService {
  public constructor(private readonly userService = new UserService()) { }

  public async create(body: GuildCreateBody, userId: string): Promise<string> {
    if (!body || !userId) throw new Error('Missing body or userId');
    await validateOrReject(body);

    // Evitar dependencia circular (arrumar isso no futuro)
    const channelService = new ChannelService();
    const guild = await Guild.create({
      id: await IdGenerator.generateId(Guild),
      name: body.name,
      ownerId: userId
    });

    const parentId = await channelService.create(plainToClass(ChannelCreateBody, {
      name: 'Text',
      type: 0
    }), guild.id);
    await channelService.create(plainToClass(ChannelCreateBody, {
      name: 'general',
      type: 1,
      parentId
    }), guild.id);

    return guild.id;
  }

  public async join(userId: string, guildId: string) {
    if (!userId || !guildId) throw new Error('Missing user id or guild id');

    const user = await this.userService.find({ id: userId });
    if (!user) throw new Error('User not found');

    const guild = await this.find({ id: guildId });
    if (!guild) throw new Error('Guild not found');

    const member = await GuildMember.create({
      id: userId,
      user: user._id,
      guildId: guildId,
      guild: guild._id
    });

    await Gateway.updateSocketGuilds(userId, guildId);
    Gateway.broadcastEventTo(guildId, 'GUILD_MEMBER_ADD', await this.findMember({ id: member.id, guildId }));
    return member.id;
  }

  public async getMembers(guildId: string) {
    if (!guildId) throw new Error('Missing guild id');

    const members = await GuildMember.find({ guildId }).populate('guild').populate('user');
    for(const member of members) {
      const socket = Gateway.findSocket(member.id);
      if(socket) member.status = socket.status;
      else member.status = 'offline';
    }

    return members;
  }

  public async userIsMemberFromGuild(userId: string, guildId: string) {
    if (!userId || !guildId) throw new Error('Missing user id or guild id');

    const member = await GuildMember.findOne({ id: userId, guildId });
    return member ? true : false;
  }

  public async findMember(query: any, select?: string) {
    const member = await GuildMember.findOne(query).select(select || '').populate('guild').populate('user');
    if(member) {
      const socket = Gateway.findSocket(member.id);
      if(socket) member.status = socket.status;
      else member.status = 'offline';
    }

    return member;
  }

  public async find(query: any, select?: string): Promise<IGuild> {
    if (!query) throw new Error('Missing query search');

    return await Guild.findOne(query).select(select || '');
  }

  public async findMany(query: any, select?: string): Promise<IGuild[]> {
    if (!query) throw new Error('Missing query search');

    return await Guild.find(query).select((select || ''));
  }
}
