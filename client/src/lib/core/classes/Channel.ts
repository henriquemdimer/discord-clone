import Client from "../Client";
import { Guild } from "./Guild";
import Message from "./Message";

export class Channel {
  private client: Client;
  public name: string;
  public id: string;
  public guildId: string;
  public guild: Guild;
  public type: number;
  public parentId?: string;
  public messages: Message[] = [];
  public loaded: boolean = false;

  public constructor(data: any, client: Client) {
    if (!data || !data.id || !data.name || !client) throw new Error('Invalid or missing data');

    this.client = client;
    this.name = data.name;
    this.id = data.id;
    this.guildId = data.guildId;
    this.guild = new Guild(data.guild, client);
    this.type = data.type;
    this.parentId = data.parentId;
  }

  public async load() {
    try {
      await this.loadMessages();
      this.loaded = true;
    } catch (err) {
      console.log(err);
    }
    return true;
  }

  public async loadMessages() {
    const res = await this.client.rest.request('get', `/channels/${this.id}/messages`, null, true);

    if (res && res.data && res.data.messages) {
      for (const msg of res.data.messages) {
        this.messages.push(new Message(msg, this.client));
      }
    }

    return true;
  }

  public pushMessage(data: any) {
    try {
      this.messages.push(new Message(data, this.client));

    } catch (err) {
      console.log(err);
    }
  }

  public async createMessage(content: string) {
    return await this.client.rest.request('post', `/channels/${this.id}/messages`, {
      content
    }, true);
  }
}
