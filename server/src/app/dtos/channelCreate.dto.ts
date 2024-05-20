import { IsNotEmpty, Length, IsNumber, IsOptional } from "class-validator";

export default class ChannelCreateBody {

  @Length(1, 20)
  @IsNotEmpty()
  public name!: string;

  @IsNumber()
  @IsNotEmpty()
  public type!: number;

  @IsOptional()
  public parentId?: string;
}
