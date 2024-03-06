import { Request, Response } from 'express';
import UserService from '../services/user.service';
import UserCreateBody from '../dtos/userCreate.dto';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import User from '../models/User';
import BaseController from '../../core/extends/BaseController';
import AuthService from '../services/auth.service';
import HttpResponses from '../../core/utils/HttpResponses';

export default class UserController extends BaseController {
    public constructor(
        private readonly userService = new UserService(),
        private readonly authService = new AuthService()
    ) {
        super();

        this.createUser = this.createUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getMe = this.getMe.bind(this);
    }

    public async createUser(req: Request, res: Response) {
        try {
            const body = plainToClass(UserCreateBody, req.body || {});

            if (body.email && (await User.findOne({ email: body.email }))) return HttpResponses.Conflict(res);

            const id = await this.userService.create(body);
            const token = this.authService.generateToken(id);
            return res.status(201).send({
                token,
                id
            });
        } catch (err) {
            // Improve this in the future
            if (Array.isArray(err)) {
                return res.status(400).send({ errors: this.parseErrors(err as ValidationError[]) });
            } else {
                console.log(err);
                return HttpResponses.InternalServerError(res);
            }
        }
    }

    public async deleteUser(req: Request, res: Response) {
        if (!res.locals.id) return HttpResponses.Unauthorized(res);

        try {
            if (!(await this.userService.findUserById(res.locals.id))) return HttpResponses.NotFound(res);
            await this.userService.deleteUser(res.locals.id);

            return HttpResponses.Ok(res);
        } catch (err) {
            console.log('Failed to delete user', err);
            return HttpResponses.InternalServerError(res);
        }
    }

    public async getMe(req: Request, res: Response) {
        try {
            if (!res.locals.id) return HttpResponses.Unauthorized(res);

            const user = await this.userService.findUserById(res.locals.id, '-password');
            if (!user) return HttpResponses.NotFound(res);

            res.status(200).send(user);
        } catch (err) {
            console.log('Failed to get user information', err);
            return HttpResponses.InternalServerError(res);
        }
    }
}
