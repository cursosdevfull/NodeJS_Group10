import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserListOneValidator {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  guid: string;
}
