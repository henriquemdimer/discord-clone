import { Router } from 'express';
import BaseController, { IBaseController } from '../../core/extends/BaseController';
import UserService from '../services/user.service';
import UserCreateBody from '../dtos/userCreate.dto';
import { plainToClass } from 'class-transformer';
import { ValidationError } from 'class-validator';
import User from '../models/User';

export default class UserController extends BaseController implements IBaseController {
    public constructor(private readonly userService = new UserService) {
        super('/users');
    }

    public init(router: Router) {
        router.post('/', async (req, res) => {
            try {
                const body = plainToClass(UserCreateBody, req.body || {});

                if (body.email && await User.findOne({ email: body.email })) {
                    return res.status(409).send('Conflict');
                }

                const id = await this.userService.create(body);
                return res.status(201).send({
                    id
                });
            } catch (_) {
                return res.status(400).send({ errors: this.parseErrors(_ as ValidationError[]) });
            }
        });

        return router;
    }
}