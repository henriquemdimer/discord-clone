import { Router } from 'express';
import BaseRoute, { IBaseRoute } from '../../core/extends/BaseRoute';
import AuthMiddleware from '../../core/middlewares/Auth';
import GuildController from '../controllers/guild.controller';

export default class GuildRoute extends BaseRoute implements IBaseRoute {
    public constructor(private readonly guildController = new GuildController()) {
        super('/guilds', AuthMiddleware);
    }

    public init(router: Router) {
        router.post('/', this.guildController.create);
        router.get('/@me', this.guildController.findMyGuilds);
        return router;
    }
}