import Client from "../Client";
import { GuildMember } from "./GuildMember";

export default class Message {
  public id: string;
  public content: string;
  public author: GuildMember;
  public channelId: string;
  public guildId: string;

  public constructor(data: any, client: Client) {
    if (!data || !data.id || !data.content || !data.content || !data.channelId || !data.guildId || !client) throw new Error('Invalid data');

    this.id = data.id;
    this.content = data.content;
    this.author = new GuildMember(data.author, client);
    this.channelId = data.channelId;
    this.guildId = data.guildId;
  }
}
