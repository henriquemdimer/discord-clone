import { Request, Response } from 'express';
import BaseController from '../../core/extends/BaseController';
import { plainToClass } from 'class-transformer';
import GuildCreateBody from '../dtos/guildCreate.dto';
import GuildService from '../services/guild.service';
import HttpResponses from '../../core/utils/HttpResponses';

export default class GuildController extends BaseController {
    public constructor(private readonly guildService = new GuildService()) {
        super();

        this.create = this.create.bind(this);
        this.findMyGuilds = this.findMyGuilds.bind(this);
    }

    public async create(req: Request, res: Response) {
        try {
            const body = plainToClass(GuildCreateBody, req.body);
            const id = await this.guildService.create(body, res.locals.id);

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

    public async findMyGuilds(req: Request, res: Response) {
        try {
            const guilds = await this.guildService.findMany({ ownerId: res.locals.id });
            if (!guilds.length) return HttpResponses.NotFound(res);

            res.status(200).send({
                guilds: guilds,
            });
        } catch (err) {
            console.log('Failed to fecth user guilds', err);
            return HttpResponses.InternalServerError(res);
        }
    }
}