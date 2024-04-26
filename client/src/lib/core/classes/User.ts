import Client from "../Client";

export default class User {
    public username: string;
    public email?: string;
    public id: string;
    public tag: string;
    public client: Client;

    public constructor(data: any, client: Client) {
        if (!client) throw Error('Missing client instance');
        this.client = client;

        if (!data.username || !data.id || !data.tag) throw new Error('Invaid user data');

        this.username = data.username
        this.id = data.id;
        this.tag = data.tag;
        this.email = data.email || undefined;
    }
}
