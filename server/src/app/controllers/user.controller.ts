import { Request, Response } from 'express';
import UserService from '../services/user.service';
import BaseController from '../../core/extends/BaseController';
import AuthService from '../services/auth.service';
import HttpResponses from '../../core/utils/HttpResponses';
import GuildService from '../services/guild.service';

export default class UserController extends BaseController {
    public constructor(
        private readonly userService = new UserService(),
        private readonly guildService = new GuildService()
    ) {
        super();

        this.getMe = this.getMe.bind(this);
        this.ownedGuilds = this.ownedGuilds.bind(this)
        this.getGuilds = this.getGuilds.bind(this);
    }

    public async getMe(req: Request, res: Response) {
        try {
            if (!res.locals.id) return HttpResponses.Unauthorized(res);

            const user = await this.userService.find({ id: res.locals.id });
            if (!user) return HttpResponses.Unauthorized(res);

            res.status(200).send(user);
        } catch (err) {
            console.log('Failed to get user information', err);
            return HttpResponses.InternalServerError(res);
        }
    }


    public async getGuilds(req: Request, res: Response) {
        try {
            if (!res.locals.id) return HttpResponses.Unauthorized(res);

            const guilds = await this.userService.getGuilds(res.locals.id);
            return res.status(200).send({
                guilds: guilds || []
            });
        } catch (err) {
            console.log('Failed to get user guilds: ', err);
            return HttpResponses.InternalServerError(res);
        }
    }

    public async ownedGuilds(req: Request, res: Response) {
        try {
            const guilds = await this.guildService.findMany({ ownerId: res.locals.id });

            res.status(200).send({
                guilds: guilds || [],
            });
        } catch (err) {
            console.log('Failed to fecth user guilds', err);
            return HttpResponses.InternalServerError(res);
        }
    }

}
