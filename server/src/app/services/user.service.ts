import { validateOrReject } from 'class-validator';
import UserCreateBody from '../dtos/userCreate.dto';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export default class UserService {
    public async create(body: UserCreateBody): Promise<number> {
        await validateOrReject(body);
        const password = await bcrypt.hash(body.password, 10);

        const user = new User({
            username: body.username,
            email: body.email,
            password,
            id: await this.generateId()
        });

        await user.save();
        return user.id;
    }

    public async generateId(): Promise<string> {
        let id = `${Date.now()}`;
        for (let i = 0; i < 5; i++) {
            id += Math.floor(Math.random() * 9);
        }

        if (await User.findOne({ id: id })) {
            return await this.generateId();
        } else {
            return id;
        }
    }
}