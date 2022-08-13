import { v4 as uuidv4 } from "uuid";
import { UserPasswordService } from "./services/user-password.service";
import User, { UserProperties } from "./user";
import { EmailVO } from "./value-objects/email.vo";
import {
  UserLastnameRequiredException,
  UserNameRequiredException,
  UserPasswordRequiredException,
  UserPasswordLengthInvalidException,
} from "./exceptions/user.exception";

export default class UserFactory {
  async create(
    name: string,
    lastname: string,
    email: EmailVO,
    password: string
  ) {
    if (!name || name.trim() === "") {
      throw new UserNameRequiredException();
    }

    if (!lastname || lastname.trim() === "") {
      throw new UserLastnameRequiredException();
    }

    if (!password || password.trim() === "") {
      throw new UserPasswordRequiredException();
    }

    if (password.length < 5) {
      throw new UserPasswordLengthInvalidException(password);
    }

    const passwordHash = await UserPasswordService.hash(password);

    const userProperties: UserProperties = {
      name,
      lastname,
      email,
      password: passwordHash,
      guid: uuidv4(),
      refreshToken: uuidv4(),
    };

    const user = new User(userProperties);
    return user;
  }
}
