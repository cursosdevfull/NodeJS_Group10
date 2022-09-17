import DataBaseBootstrap from '../../../bootstrap/database.bootstrap';
import { Role } from '../../role/domain/role';
import { UserEntity } from '../../user/infrastructure/user.entity';
import { Auth } from '../domain/auth';
import { AuthRepository } from '../domain/auth.repository';

export class AuthInfrastructure implements AuthRepository {
  async getUserByRefreshToken(refreshToken: string): Promise<{
    name: string;
    lastname: string;
    password: string;
    email: string;
    refreshToken: string;
    guid: string;
    roles: string[] | number[] | Role[];
  }> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.findOne({
      where: { refreshToken },
      relations: ["roles"],
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
      guid: result.guid,
      roles: result.roles.map((el) => el.name),
    };
  }

  async getUser(auth: Auth): Promise<{
    name: string;
    lastname: string;
    email: string;
    password: string;
    refreshToken: string;
    roles: string[] | number[] | Role[];
  }> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.findOne({
      where: { email: auth.properties().email },
      relations: ["roles"],
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
      roles: result.roles.map((el) => el.name),
    };
  }
}
