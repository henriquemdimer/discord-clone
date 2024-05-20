import Client from "../Client";
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export type METHODS = 'get' | 'post' | 'patch' | 'delete';

export interface RequestManagerOptions {
    url: string;
    port?: string;
    secure?: boolean;
}

export default class RequestManager {
    public client: Client;
    private instance: AxiosInstance;
    public baseUrl: string;

    public constructor(client: Client, options: RequestManagerOptions) {
        this.client = client;
        this.baseUrl = (options.secure ? 'https://' : 'http://') + options.url + `:${options.port || 8080}`;
        this.instance = axios.create({
            baseURL: this.baseUrl
        });

        console.log(this.baseUrl, options.url);
    }

    public async request(method: METHODS, endpoint: string, body?: any, sendAuth: boolean = false): Promise<AxiosResponse> {
        let headers = sendAuth ? { Authorization: this.client.token } : {};

        return await this.instance({
            method,
            url: endpoint,
            data: body,
            headers
        });
    }
}
