import EventEmitter from "events";
import User from "./classes/User";
import RequestManager from "./rest/RequestManager";

export default class Client extends EventEmitter {
    public token: string;
    public user?: User;
    public rest: RequestManager;

    public constructor(url: string) {
        super();
        this.token = '';
        this.rest = new RequestManager(this, url);
    }

    public async init(token: string) {
        this.token = token;
        await this.getMyUser()
        this.emit('ready');
    }

    public async getMyUser() {
        const { data } = await this.rest.request('get', '/users/@me', null, true);
        this.user = new User(this, data);
    }

    public async registerUser(username: string, email: string, password: string): Promise<{ token: string, id: string }> {
        if (!username || !email || !password) throw new Error('Missing some parameter');
        const res = await this.rest.request('post', '/users', {
            username,
            email,
            password
        });

        return {
            token: res.data.token,
            id: res.data.id
        }
    }
}