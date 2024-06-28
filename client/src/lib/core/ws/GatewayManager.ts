import EventEmitter from "events";
import WebSocket, { MessageEvent } from "isomorphic-ws";
import { Channel } from "../classes/Channel";
import { Guild } from "../classes/Guild";
import { GuildMember } from "../classes/GuildMember";
import Client from "../Client";

export interface GatewayManagerOptions {
  url: string;
  secure?: boolean;
}

export default class GatewayManager extends EventEmitter {
  public ws?: WebSocket;
  public client: Client;
  public options: GatewayManagerOptions;

  public constructor(client: Client, options: GatewayManagerOptions) {
    super();
    this.client = client;

    this.options = options;
    this.identify = this.identify.bind(this);
    this.startHeartbeat = this.startHeartbeat.bind(this);
  }

  public init() {
    this.ws = new WebSocket((this.options.secure ? 'wss://' : 'ws://') + this.options.url);
    this.ws.onmessage = (msg) => this.onMessage(msg);
  }

  private onMessage(rawPayload: MessageEvent) {
    try {
      const payload = JSON.parse(rawPayload.data.toString());
      if (payload.op == undefined) return;

      switch (payload.op) {
        case 0:
          this.identify();
          this.startHeartbeat();
          break;

        case 2:
          this.onEvent(payload);
          break;
      }
    } catch (e) { }
  }

  private onEvent(payload: any) {
    const { op, t, data } = payload;
    if (op != 2) return;

    switch (t) {
      case 'READY':
        this.emit('ready');
        break;

      case 'MESSAGE_CREATE':
        if (data) {
          const guildId = data.guildId;
          const channelId = data.channelId;

          const guild = this.client.guilds.find((g) => g.id == guildId);
          if (!guild) return;

          const channel = guild.channels.find((c) => c.id == channelId);
          const reg = new RegExp(`@${this.client.user?.tag}|@everyone`, 'gi');

          if (!channel) {
            const umention = guild.unloadedNotifications.find((c) => c.channelId = data.channelId);
            
            if(reg.test(data.content)) {
              if(!umention) guild.unloadedNotifications.push({ channelId: data.channelId, mentions: 1, newMessages: true });
              else umention.mentions += 1;
            } else {
              if(!umention) guild.unloadedNotifications.push({ channelId: data.channelId, mentions: 0, newMessages: true });
              else umention.newMessages = true;
            }


            this.client.emit('mentionUpdate')
            return
          };

          if(channel?.id != this.client.selectedChannel?.id) {
            channel.hasUnreadMessages = true;

            if(reg.test(data.content)) channel.newMentions += 1;
            this.client.emit('mentionUpdate');
          }

          if(!guild.loaded || !channel.loaded) return
          channel.pushMessage(data);

          this.client.emit('messageCreate');
        }
        break;
      
      case 'MESSAGE_DELETE':
        if(data) {
          const msgId = data.id;
          const channelId = data.channelId;
          const guildId = data.guildId;

          const guild = this.client.guilds.find((g) => g.id == guildId);
          if(!guild || !guild.loaded) return;

          const channel = guild.channels.find((c) => c.id == channelId);
          if(!channel || !channel.loaded) return;

          const msg = channel.messages.find((m) => m.id == msgId);
          if(!msg) return;

          const index = channel.messages.findIndex((m) => m.id == msgId);
          if(index != -1) {
            channel.messages.splice(index, 1);
          }
          
          this.client.emit('messageDelete', msg);
        }
        break;

      case 'GUILD_CREATE':
        if (!data) return;
        this.client.guilds.push(new Guild(data, this.client));
        break;

      case 'CHANNEL_CREATE':
        if (data) {
          const guildId = data.guildId;

          const guild = this.client.guilds.find((g) => g.id == guildId);
          if (!guild || !guild.loaded) return;

          guild.channels.push(new Channel(data, this.client));
        }
        break;

      case 'GUILD_MEMBER_ADD':
        if (data) {
          const guildId = data.guildId;

          const guild = this.client.guilds.find((g) => g.id == guildId);
          if (!guild || !guild.loaded) return;
          try {
            guild.members.push(new GuildMember(data, this.client));
          } catch (e) {
            console.log(e)
          }

          this.client.emit('guildMemberAdd');
        }
        break;
    }
  }

  public startHeartbeat() {
    setInterval(() => {
      this.send(10);
    }, 45000);
  }

  public identify() {
    this.send(11, {
      token: this.client.token
    });
  }

  public send(op: number, data?: any) {
    if (this.ws) this.ws.send(JSON.stringify({ op, data }));
  }
}
