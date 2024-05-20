import { Channel } from "./Channel";
import Client from "../Client";
import { GuildMember } from "./GuildMember";
import { EventEmitter } from "events";

export class Guild extends EventEmitter {
  private client: Client;
  public name: string;
  public id: string;
  public members: GuildMember[];
  public channels: Channel[];
  public loaded: boolean = false;

  public constructor(data: any, client: Client) {
    super();
    if (!data || !data.id || !data.name || !client) throw new Error('Invalid or missing data');

    this.client = client;
    this.name = data.name;
    this.id = data.id;
    console.log(this.id);
    this.members = [];
    this.channels = [];
  }

  public async load() {
    try {
      await this.getChannels();
      await this.getMembers();
      this.loaded = true;
    } catch (_) {
      console.log(_);
    }
    return true;
  }

  public async getChannels() {
    const { data } = await this.client.rest.request('get', `/guilds/${this.id}/channels`, null, true);

    if (data && data.channels && Array.isArray(data.channels)) {
      this.channels = [];
      for (const channel of data.channels) {
        this.channels.push(new Channel(channel, this.client));
      }
    }

    this.emit('update');
  }

  public async getMembers() {
    const { data } = await this.client.rest.request('get', `/guilds/${this.id}/members`, null, true);

    if (data && data.members && Array.isArray(data.members)) {
      this.members = [];
      for (const member of data.members) {
        this.members.push(new GuildMember(member, this.client));
      }
    }

    this.emit('update');
  }

  public async createChannel(name: string, type: number, parent?: string) {
    const { data } = await this.client.rest.request('post', `/guilds/${this.id}/channels`, {
      name,
      type,
      parentId: parent
    }, true);

    return data.id;
  }
}
