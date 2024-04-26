import Client from "../Client";
import { Guild } from "./Guild";

export class Channel {
  private client: Client;
  public name: string;
  public id: string;
  public guildId: string;
  public guild: Guild;

  public constructor(data: any, client: Client) {
    if (!data || !data.id || !data.name || !client) throw new Error('Invalid or missing data');

    this.client = client;
    this.name = data.name;
    this.id = data.id;
    this.guildId = data.guildId;
    this.guild = new Guild(data.guild, client);
  }
}
