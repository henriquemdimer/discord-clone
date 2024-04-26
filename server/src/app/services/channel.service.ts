import { validateOrReject } from "class-validator";
import IdGenerator from "../../core/utils/IdGenerator";
import ChannelCreateBody from "../dtos/channelCreate.dto";
import Channel from "../models/Channel";
import GuildService from "./guild.service";

export default class ChannelService {
  public constructor(private readonly guildService = new GuildService()) { }

  public async create(body: ChannelCreateBody, guildId: string) {
    if (!body || !guildId) throw new Error('Missing body or guild id');
    await validateOrReject(body);

    const guild = await this.guildService.find({ id: guildId });
    if (!guild) throw new Error('Guild not found');

    const channel = await Channel.create({
      id: await IdGenerator.generateId(Channel),
      name: body.name,
      guildId,
      guild: guild._id
    });

    return channel.id;
  }

  public async getChannels(guildId: string) {
    if (!guildId) throw new Error('Missing guild id');

    return await Channel.find({ guildId }).populate('guild');
  }
}
