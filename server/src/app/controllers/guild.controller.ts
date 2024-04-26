import { Request, Response } from 'express';
import BaseController from '../../core/extends/BaseController';
import { plainToClass } from 'class-transformer';
import GuildCreateBody from '../dtos/guildCreate.dto';
import GuildService from '../services/guild.service';
import HttpResponses from '../../core/utils/HttpResponses';
import ChannelCreateBody from '../dtos/channelCreate.dto';
import ChannelService from '../services/channel.service';

export default class GuildController extends BaseController {
    public constructor(private readonly guildService = new GuildService(), private readonly channelService = new ChannelService()) {
        super();

        this.create = this.create.bind(this);
        this.join = this.join.bind(this);
        this.getMembers = this.getMembers.bind(this);
        this.createChannel = this.createChannel.bind(this);
        this.getChannels = this.getChannels.bind(this);
    }

    public async create(req: Request, res: Response) {
        try {
            const body = plainToClass(GuildCreateBody, req.body);
            const id = await this.guildService.create(body, res.locals.id);
            await this.guildService.join(res.locals.id, id);

            res.status(201).send({
                id
            });
        } catch (err) {
            if (Array.isArray(err)) {
                return res.status(400).send({ errors: this.parseErrors(err) });
            } else {
                console.log('Failed to create guild', err);
                return HttpResponses.InternalServerError(res);
            }
        }
    }

    public async join(req: Request, res: Response) {
        if (!res.locals.id) return HttpResponses.Unauthorized(res);

        try {
            const id = req.params.id;
            if (!id) return HttpResponses.BadRequest(res);

            await this.guildService.join(res.locals.id, id);
            return HttpResponses.Ok(res);
        } catch (err) {
            console.log('Failed to join guild: ', err);
            return HttpResponses.InternalServerError(res);
        }
    }

    public async getMembers(req: Request, res: Response) {
        try {
            if (!res.locals.id) return HttpResponses.Unauthorized(res);

            const id = req.params.id;
            if (!id) return HttpResponses.BadRequest(res);

            const members = await this.guildService.getMembers(id);
            if (!members.find((m) => m.id == res.locals.id)) return HttpResponses.Unauthorized(res);

            return res.status(200).send({ members });
        } catch (err) {
            console.log('Failed to get guild members: ', err);
            return HttpResponses.InternalServerError(res);
        }
    }

    public async createChannel(req: Request, res: Response) {
        try {
            if (!res.locals.id) return HttpResponses.Unauthorized(res);

            const guildId = req.params.id;
            if (!guildId) return HttpResponses.BadRequest(res);
            if (!(await this.guildService.userIsMemberFromGuild(res.locals.id, guildId))) return HttpResponses.Unauthorized(res);

            let body = req.body;
            if (!body) return HttpResponses.BadRequest(res);
            body = plainToClass(ChannelCreateBody, body);

            const id = await this.channelService.create(body, guildId);
            return res.status(201).send({ id });
        } catch (err) {
            console.log('Failed to create channel: ', err);
            return HttpResponses.InternalServerError(res);
        }
    }

    public async getChannels(req: Request, res: Response) {
        try {
            if (!res.locals.id) return HttpResponses.Unauthorized(res);

            const guildId = req.params.id;
            if (!guildId) return HttpResponses.BadRequest(res);
            if (!(await this.guildService.userIsMemberFromGuild(res.locals.id, guildId))) return HttpResponses.Unauthorized(res);

            const channels = await this.channelService.getChannels(guildId);
            return res.status(200).send({ channels });
        } catch (err) {
            console.log('Failed to get guild channels: ', err);
            return HttpResponses.InternalServerError(res);
        }
    }
}
