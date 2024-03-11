import { validateOrReject } from 'class-validator';
import GuildCreateBody from '../dtos/guildCreate.dto';
import Guild from '../models/Guild';
import IdGenerator from '../../core/utils/IdGenerator';

export interface IGuild {
    id: string;
    name: string;
    ownerId: string;
    updatedAt: string;
    createdAt: string;
}

export default class GuildService {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async findMany(query: any, select?: string): Promise<IGuild[]> {
        if (!query) throw new Error('Missing query search');

        return await Guild.find(query).select((select || '') + '-_id -__v');
    }
}