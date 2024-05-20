import { Length } from "class-validator";

export default class MessageCreateBody {
  @Length(1, 2000)
  public content!: string;
}
