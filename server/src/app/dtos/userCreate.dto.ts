import { IsEmail, IsNotEmpty, Length, } from 'class-validator';

export default class UserCreateBody {
    @IsNotEmpty()
    @Length(4, 20)
    readonly username!: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email!: string;

    @IsNotEmpty()
    @Length(6, 20)
    readonly password!: string;
}