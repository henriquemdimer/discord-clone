import Client from "../Client";
import { Guild } from "./Guild";
import User from "./User";

export class GuildMember {
  public id: string;
  public user: User;
  public guildId: string;
  public guild: Guild;
  public status: 'online' | 'offline' | 'dnd' | 'idle';

  public constructor(data: any, client: Client) {
    if (!data || !data.id || !client) throw new Error('Invalid or missing data');

    this.id = data.id;
    this.user = new User(data.user, client);
    this.guildId = data.guildId;
    this.status = data.status || 'offline';
    this.guild = new Guild(data.guild, client);
  }
}
