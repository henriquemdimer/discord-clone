import EventEmitter from "events";
import { Channel } from "./classes/Channel";
import { Guild } from "./classes/Guild";
import User from "./classes/User";
import RequestManager from "./rest/RequestManager";
import GatewayManager from "./ws/GatewayManager";

export default class Client extends EventEmitter {
    public token: string = '';
    public user?: User;
    public rest: RequestManager;
    public guilds: Guild[] = [];
    public selectedGuild?: Guild;
    public selectedChannel?: Channel;
    public ws: GatewayManager;
    public activeModal: boolean;

    public constructor(url: string) {
        super();

        const secure = import.meta.env.VITE_HTTPS === 'true' ? true : false;
        const gurl = import.meta.env.VITE_GATEWAY_URL;

        if(!gurl) throw new Error('Missing gateway url');
        this.rest = new RequestManager(this, { secure, url });
        this.ws = new GatewayManager(this, { secure, url: gurl });
        this.activeModal = false;
    }

    public async init(token: string) {
        window.addEventListener('keydown', (e) => this.emit('clientKeyDown', e));
        window.addEventListener('keyup', (e) => this.emit('clientKeyUp', e));

        this.token = token;
        this.ws.init();
        this.ws.on('ready', async () => {
            await this.getMyUser()
            await this.getGuilds();
            this.emit('ready');
        })
    }

    public async getGuilds() {
        const { data } = await this.rest.request('get', '/users/@me/guilds', null, true);

        if (data.guilds && Array.isArray(data.guilds)) {
            this.guilds = [];
            for (const guild of data.guilds) {
                this.guilds.push(new Guild(guild, this));
            }

            if (!this.selectedGuild) await this.selectGuild(this.guilds[0]);
        }

        this.emit('guildsUpdate');
    }

    public async selectGuild(_guild: Guild) {
        const guild = this.guilds.find((g) => g.id == _guild.id);
        if (!guild) return;

        if (!guild.loaded) await guild.load();
        this.selectedGuild = guild;

        const channel = this.selectedGuild.channels.filter((c) => c.type == 1)[0];
        if (channel) await this.selectChannel(channel.id);
        this.emit('selectGuild');
    }

    public async selectChannel(channelId: string) {
        const channel = this.selectedGuild?.channels.find((c) => c.id == channelId);
        if (channel) {
            if (channel.type == 0) return;
            if (!channel.loaded) await channel.load();
            this.selectedChannel = channel;
            channel.hasUnreadMessages = false;
            channel.newMentions = 0;
            this.emit('mentionUpdate');
            this.emit('selectChannel');
        }
    }

    public async getMyUser() {
        const { data } = await this.rest.request('get', '/users/@me', null, true);
        this.user = new User(data, this);
        this.emit('userUpdate');
    }

    public async createGuild(name: string) {
        await this.rest.request('post', '/guilds', {
            name
        }, true);

        return 0;
    }

    public async joinGuild(invite: string) {
        await this.rest.request('post', `/guilds/${invite}/join`, null, true);
        return 0;
    }

    public async registerAccount(username: string, email: string, password: string): Promise<{ token: string, id: string }> {
        if (!username || !email || !password) throw new Error('Missing some parameter');
        const res = await this.rest.request('post', '/auth/register', {
            username,
            email,
            password
        });

        return {
            token: res.data.token,
            id: res.data.id
        }
    }

    public async loginAccount(email: string, password: string) {
        if (!email || !password) throw new Error('Missing some parameter');
        const res = await this.rest.request('post', '/auth/login', {
            password,
            email
        });

        return {
            token: res.data.token,
            id: res.data.id
        };
    }
}
