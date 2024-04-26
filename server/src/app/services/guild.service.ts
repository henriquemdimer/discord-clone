import { validateOrReject } from 'class-validator';
import GuildCreateBody from '../dtos/guildCreate.dto';
import Guild from '../models/Guild';
import IdGenerator from '../../core/utils/IdGenerator';
import UserService from './user.service';
import GuildMember from '../models/GuildMember';

export interface IGuild {
    id: string;
    _id: string;
    name: string;
    ownerId: string;
    updatedAt: string;
    createdAt: string;
}

export default class GuildService {
    public constructor(private readonly userService = new UserService()) { }

    public async create(body: GuildCreateBody, userId: string): Promise<string> {
        if (!body || !userId) throw new Error('Missing body or userId');
        await validateOrReject(body);

        const guild = await Guild.create({
            id: await IdGenerator.generateId(Guild),
            name: body.name,
            ownerId: userId
        });

        return guild.id;
    }

    public async join(userId: string, guildId: string) {
        if (!userId || !guildId) throw new Error('Missing user id or guild id');

        const user = await this.userService.find({ id: userId });
        if (!user) throw new Error('User not found');

        const guild = await this.find({ id: guildId });
        if (!guild) throw new Error('Guild not found');

        const member = await GuildMember.create({
            id: userId,
            user: user._id,
            guildId: guildId,
            guild: guild._id
        });

        return member.id;
    }

    public async getMembers(guildId: string) {
        if (!guildId) throw new Error('Missing guild id');

        return await GuildMember.find({ guildId }).populate('guild').populate('user', '-password -email');
    }

    public async userIsMemberFromGuild(userId: string, guildId: string) {
        if (!userId || !guildId) throw new Error('Missing user id or guild id');

        const member = await GuildMember.findOne({ id: userId, guildId });
        return member ? true : false;
    }

    public async find(query: any, select?: string): Promise<IGuild> {
        if (!query) throw new Error('Missing query search');

        return await Guild.findOne(query).select(select || '');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async findMany(query: any, select?: string): Promise<IGuild[]> {
        if (!query) throw new Error('Missing query search');

        return await Guild.find(query).select((select || ''));
    }
}
