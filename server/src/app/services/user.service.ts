import { validateOrReject } from 'class-validator';
import UserCreateBody from '../dtos/userCreate.dto';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import IdGenerator from '../../core/utils/IdGenerator';

export interface IUser {
    username: string;
    email: string;
    tag: string;
    password: string;
    id: string;
}
export default class UserService {
    public async create(body: UserCreateBody): Promise<string> {
        await validateOrReject(body);
        const password = await bcrypt.hash(body.password, 10);
        const tag = await this.generateTag(body.username.toLowerCase());

        const user = new User({
            username: body.username,
            email: body.email,
            password,
            tag,
            id: await IdGenerator.generateId(User)
        });

        await user.save();
        return user.id;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async find(query: any, select?: string): Promise<IUser> {
        if (!query) throw new Error('Missing search query');

        return await User.findOne(query).select((select || '') + ' -_id -__v');
    }

    public async delete(userId: string) {
        if (!userId) throw new Error('Missing user id');

        return await User.deleteOne({ id: userId });
    }

    public async generateTag(base: string): Promise<string> {
        if (await User.findOne({ tag: base })) {
            return await this.generateTag(base + Math.floor(Math.random() * 9999));
        } else {
            return base;
        }
    }
}