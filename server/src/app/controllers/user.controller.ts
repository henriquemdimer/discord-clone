import { Request, Response } from 'express';
import UserService from '../services/user.service';
import BaseController from '../../core/extends/BaseController';
import AuthService from '../services/auth.service';
import HttpResponses from '../../core/utils/HttpResponses';

export default class UserController extends BaseController {
    public constructor(
        private readonly userService = new UserService(),
        private readonly authService = new AuthService()
    ) {
        super();

        this.getMe = this.getMe.bind(this);
    }

    public async getMe(req: Request, res: Response) {
        try {
            if (!res.locals.id) return HttpResponses.Unauthorized(res);

            const user = await this.userService.findUser({ id: res.locals.id }, '-password');
            if (!user) return HttpResponses.NotFound(res);

            res.status(200).send(user);
        } catch (err) {
            console.log('Failed to get user information', err);
            return HttpResponses.InternalServerError(res);
        }
    }
}
