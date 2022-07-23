import { UserProperties } from "src/modules/user/domain/user";
import { DTO } from "./dto.interface";

interface UserDTO {
  name: string;
}

export class UserDeleteDTO extends DTO<UserProperties, UserDTO> {
  execute(data: UserProperties): UserDTO {
    return { name: data.name };
  }
}
