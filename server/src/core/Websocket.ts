/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RawData, WebSocket, WebSocketServer } from 'ws';
import AuthService from '../app/services/auth.service';
import User from '../app/models/User';
import 'dotenv/config';
import UserService from '../app/services/user.service';

export type EVENT_TYPES = 'READY' | 'MESSAGE_CREATE' | 'GUILD_CREATE' | 'CHANNEL_CREATE' | 'GUILD_MEMBER_ADD';

class Gateway {
  public server: WebSocketServer;
  public sockets: Socket[] = [];
  public authService: AuthService;
  public userService: UserService;
  public port: number;

  public constructor(port = 8081) {
    this.server = new WebSocketServer({ port });
    this.authService = new AuthService();
    this.userService = new UserService();
    this.port = port;
  }

  public async init() {
    setInterval(() => {
      this.sockets.forEach((socket, i) => {
        if (!socket.authorized) {
          if (Date.now() - socket.connectionStarted > 10000) {
            socket.socket.close();
            this.sockets.splice(i, 1);
          }
        } else {
          if (Date.now() - socket.lastHearbeat > 70000) {
            this.disconnect(socket.sessionId, socket.socket);
          }
        }
      });
    }, 1000);

    this.server.on('connection', (socket) => {
      // socket.on('error', (e) => console.log(e));
      // socket.on('close', (e) => console.log(e));
      socket.on('message', (msg) => this.onMessage(msg, socket));
      this.onConnection(socket);
    });
  }

  public async updateSocketGuilds(userId: string, guildId?: string) {
    const socket = this.sockets.find((s) => s.userId == userId);
    if (!socket) return;

    const guilds = await this.userService.getGuilds(userId);
    //@ts-ignore
    socket.guilds = guilds.map((g) => g.id);
    if (guildId?.length) {
      //@ts-ignore
      const guild = guilds.find((g) => g?.id == guildId);
      if (guild) this.sendEvent(socket.socket, 'GUILD_CREATE', guild);
    }
  }

  private onConnection(socket: WebSocket) {
    const s = new Socket(socket);
    s.generateSessionId(this.sockets);
    this.sockets.push(s);
    this.send(socket, 0);
  }

  private async onMessage(rawPayload: RawData, sok: WebSocket) {
    try {
      const payload = new SocketPayload(rawPayload);
      //@ts-ignore
      const sid = sok.sessionId;
      const socket = this.sockets.find((s) => s.sessionId == sid);

      if (!socket) return this.disconnect(sid, sok);
      if (!socket.authorized && payload.op != 11) return this.disconnect(sid, sok);

      switch (payload.op) {
      case 10:
        socket.lastHearbeat = Date.now();
        break;

      case 11:
        if (!payload.data || !payload.data.token) return this.disconnect(sid, sok);
        try {
          const userId = this.authService.verifyToken(payload.data.token);
          if (!userId || !(await User.findOne({ id: userId }))) return this.disconnect(sid, sok);

          const oldSok = this.sockets.find((s) => s.userId == userId);
          if (oldSok) this.disconnect(oldSok.sessionId, oldSok.socket);

          socket.authorized = true;
          socket.status = 'online';
          socket.lastHearbeat = Date.now();
          socket.userId = userId;

          const guilds = await this.userService.getGuilds(userId);
          const gguilds = guilds.map((g) => g?.id);
          //@ts-ignore
          if (guilds) socket.guilds = gguilds;

          this.sendEvent(socket.socket, 'READY');
        } catch (err) {
          this.disconnect(sid, sok);
        }
        break;
      }
    } catch (_) {
      console.log(_);
    }
  }

  public sendEvent(socket: WebSocket, eventName: EVENT_TYPES, data?: any) {
    this.send(socket, 2, eventName, data);
  }

  public broadcastEventTo(guildId: string, eventName: EVENT_TYPES, data?: any) {
    this.sockets.filter((g) => g.guilds.includes(guildId)).forEach((s) => {
      this.sendEvent(s.socket, eventName, data);
    });
  }

  public send(socket: WebSocket, op: number, t?: EVENT_TYPES, data?: any) {
    socket.send(JSON.stringify({ op, t, data }));
  }

  public findSocket(userId: string) {
    return this.sockets.find((c) => c.userId == userId);
  }

  public disconnect(sessionId: string, socket: WebSocket) {
    const s = this.sockets.findIndex((s) => s.sessionId == sessionId);
    if (s != -1) {
      this.sockets[s].socket.close();
      this.sockets.splice(s, 1);
    } else {
      socket.close();
    }
  }
}

/*
OP CODES
0 - 10 = SERVER -> CLIENT

0 -> HELLO
1 -> ACK
2 -> EVENT

10 - 999 CLIENT -> SERVER

10 -> HEARTBEAT
11 -> IDENTIFICATION
*/
export class SocketPayload {
  public op: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data?: any;

  public constructor(payload: RawData) {
    const p = JSON.parse(payload.toString());
    if (!p.op) throw new Error('Invalid payload');

    this.op = p.op;
    this.data = p.data;
  }
}

export class Socket {
  public sessionId: string = '';
  public userId: string = '';
  public status: 'online' | 'offline' | 'idle' | 'dnd' = 'offline';
  public authorized: boolean = false;
  public connectionStarted: number = Date.now();
  public socket: WebSocket;
  public lastHearbeat: number = 0;
  public guilds: string[] = [];

  public constructor(socket: WebSocket) {
    this.socket = socket;
  }

  public generateSessionId(sockets: Socket[]): string {
    const id = Math.floor(Math.random() * 999999).toString();
    if (sockets.find((s) => s.sessionId == id)) {
      return this.generateSessionId(sockets);
    }

    // @ts-ignore
    this.socket.sessionId = id;
    this.sessionId = id;
    return id;
  }
}

export default new Gateway();
