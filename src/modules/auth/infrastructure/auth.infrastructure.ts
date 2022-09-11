import { UserEntity } from "../../user/infrastructure/user.entity";
import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/auth.repository";
import { Tokens } from "../domain/tokens.interface";
import DataBaseBootstrap from "../../../bootstrap/database.bootstrap";

export class AuthInfrastructure implements AuthRepository {
  async getUserByRefreshToken(
    refreshToken: string
  ): Promise<{
    name: string;
    lastname: string;
    password: string;
    email: string;
    refreshToken: string;
    guid: string
  }> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.findOne({
      where: { refreshToken },
    });

    if (!result) {
      return null;
    }

    return {
      name: result.name,
      email: result.email,
      lastname: result.lastname,
      password: result.password,
      refreshToken: result.refreshToken,
      guid: result.guid
    };
  }

  async getUser(auth: Auth): Promise<{
    name: string;
    lastname: string;
    email: string;
    password: string;
    refreshToken: string;
  }> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.findOne({
      where: { email: auth.properties().email },
    });

    if (!result) {
      return null;
    }

    return {
      name: result.name,
      email: result.email,
      lastname: result.lastname,
      password: result.password,
      refreshToken: result.refreshToken,
    };
  }
}
