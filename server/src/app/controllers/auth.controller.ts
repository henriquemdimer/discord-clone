import { Request, Response } from 'express';
import BaseController from '../../core/extends/BaseController';
import AuthService from '../services/auth.service';
import HttpResponses from '../../core/utils/HttpResponses';
import UserService from '../services/user.service';

export default class AuthController extends BaseController {
    public constructor(
        private readonly authService = new AuthService(),
        private readonly userService = new UserService()
    ) {
        super();

        this.loginUser = this.loginUser.bind(this);
    }

    public async loginUser(req: Request, res: Response) {
        const token = req.headers.authorization;
        if (!token) return HttpResponses.Unauthorized(res);

        const id = this.authService.verifyToken(token);
        if (!id) return HttpResponses.Unauthorized(res);
        if (!this.userService.findUserById(id)) return HttpResponses.Unauthorized(res);

        res.send({
            id
        });
    }
}