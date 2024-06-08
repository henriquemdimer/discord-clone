import { IsNotEmpty, Length } from 'class-validator';

export default class GuildCreateBody {
    @IsNotEmpty()
    @Length(4, 20)
  readonly name!: string;
}