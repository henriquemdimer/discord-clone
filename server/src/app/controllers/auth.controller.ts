import { Request, Response } from 'express';
import BaseController from '../../core/extends/BaseController';
import AuthService from '../services/auth.service';
import HttpResponses from '../../core/utils/HttpResponses';
import UserService from '../services/user.service';
import bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import UserCreateBody from '../dtos/userCreate.dto';
import User from '../models/User';

export default class AuthController extends BaseController {
    public constructor(
        private readonly authService = new AuthService(),
        private readonly userService = new UserService()
    ) {
        super();

        this.loginAccount = this.loginAccount.bind(this);
        this.registerAccount = this.registerAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    public async registerAccount(req: Request, res: Response) {
        try {
            const body = plainToClass(UserCreateBody, req.body || {});

            if (body.email && (await User.findOne({ email: body.email }))) return HttpResponses.Conflict(res);

            const id = await this.userService.create(body);
            const token = this.authService.generateToken(id);
            return res.status(201).send({
                id,
                token
            });
        } catch (err) {
            // Improve this in the future
            if (Array.isArray(err)) {
                return res.status(400).send({ errors: this.parseErrors(err) });
            } else {
                console.log(err);
                return HttpResponses.InternalServerError(res);
            }
        }
    }

    public async loginAccount(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return HttpResponses.Unauthorized(res);

            const user = await this.userService.find({ email }, '+password');
            if (!user) return HttpResponses.NotFound(res);

            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) return HttpResponses.Unauthorized(res);

            const token = this.authService.generateToken(user.id);
            res.status(200).send({
                id: user.id,
                token
            });
        } catch (err) {
            console.log('Failed to login user', err);
            return HttpResponses.InternalServerError(res);
        }
    }

    public async deleteAccount(req: Request, res: Response) {
        if (!res.locals.id) return HttpResponses.Unauthorized(res);

        try {
            if (!(await this.userService.find({ id: res.locals.id }))) return HttpResponses.NotFound(res);
            await this.userService.delete(res.locals.id);

            return HttpResponses.Ok(res);
        } catch (err) {
            console.log('Failed to delete user', err);
            return HttpResponses.InternalServerError(res);
        }
    }
}
