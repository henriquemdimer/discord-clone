import EventEmitter from "events";
import { Guild } from "./classes/Guild";
import User from "./classes/User";
import RequestManager from "./rest/RequestManager";

export default class Client extends EventEmitter {
    public token: string = '';
    public user?: User;
    public rest: RequestManager;
    public guilds: Guild[] = [];
    public selectedGuild?: Guild;

    public constructor(url: string) {
        super();
        this.rest = new RequestManager(this, url);
    }

    public async init(token: string) {
        this.token = token;
        await this.getMyUser()
        await this.getGuilds();
        this.emit('ready');
    }

    public async getGuilds() {
        const { data } = await this.rest.request('get', '/users/@me/guilds', null, true);

        if (data.guilds && Array.isArray(data.guilds)) {
            this.guilds = [];
            for (const guild of data.guilds) {
                this.guilds.push(new Guild(guild, this));
            }
            console.log(this.guilds);
            if (!this.selectedGuild) this.selectGuild(this.guilds[0]);
        }

        this.emit('guildsUpdate');
    }

    public async selectGuild(guild: Guild) {
        this.selectedGuild = guild;
        this.emit('selectGuild');
    }

    public async getMyUser() {
        const { data } = await this.rest.request('get', '/users/@me', null, true);
        this.user = new User(data, this);
        this.emit('userUpdate');
    }

    public async createGuild(name: string) {
        const res = await this.rest.request('post', '/guilds', {
            name
        }, true);

        await this.getGuilds();
        return 0;
    }

    public async joinGuild(invite: string) {
        await this.rest.request('post', `/guilds/${invite}/join`, null, true);
        await this.getGuilds();
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
