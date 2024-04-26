import { IsNotEmpty, Length } from "class-validator";

export default class ChannelCreateBody {

  @Length(1, 20)
  @IsNotEmpty()
  public name!: string;
}
