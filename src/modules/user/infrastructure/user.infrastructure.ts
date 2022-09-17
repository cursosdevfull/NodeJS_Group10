import { err, ok, Result } from 'neverthrow';
import { In } from 'typeorm';

import DataBaseBootstrap from '../../../bootstrap/database.bootstrap';
import { RoleEntity } from '../../role/infrastructure/role.entity';
import { UserEmailInvalidException, UserNotFoundException } from '../domain/exceptions/user.exception';
import User, { UserUpdate } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { EmailVO } from '../domain/value-objects/email.vo';
import { UserEntity } from './user.entity';

export default class UserInfrastructure implements UserRepository {
  async list(): Promise<User[]> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);

    const result = await repo.find({
      where: { active: true },
      relations: ["roles"],
    });
    return result.map((el: UserEntity) => {
      const emailResult = EmailVO.create(el.email);
      if (emailResult.isErr()) {
        throw new UserEmailInvalidException();
      }

      return new User({
        guid: el.guid,
        name: el.name,
        lastname: el.lastname,
        email: emailResult.value,
        password: el.password,
        refreshToken: el.refreshToken,
        active: el.active,
        roles: el.roles,
      });
    });
  }
  async listOne(
    guid: string
  ): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);

    const result = await repo.findOne({
      where: { guid },
      relations: ["roles"],
    });
    const emailResult = EmailVO.create(result.email);

    if (emailResult.isErr()) {
      return err(new UserEmailInvalidException());
    }

    if (!result) {
      return err(new UserNotFoundException());
    } else {
      return ok(
        new User({
          guid: result.guid,
          name: result.name,
          lastname: result.lastname,
          email: emailResult.value,
          password: result.password,
          refreshToken: result.refreshToken,
          active: result.active,
          roles: result.roles,
        })
      );
    }
  }

  async insert(user: User): Promise<User> {
    const userInsert = new UserEntity();

    const {
      guid,
      name,
      lastname,
      email,
      password,
      refreshToken,
      active,
      roles,
    } = user.properties();
    const rolesUser = await DataBaseBootstrap.dataSource
      .getRepository(RoleEntity)
      .findBy({ roleId: In(roles as number[]) });

    Object.assign(userInsert, {
      guid,
      name,
      lastname,
      email: email.value,
      password,
      refreshToken,
      active,
      roles: rolesUser,
    });

    await DataBaseBootstrap.dataSource
      .getRepository(UserEntity)
      .save(userInsert);
    return user;
  }
  async update(
    guid: string,
    user: Partial<UserUpdate>
  ): Promise<Result<User, UserNotFoundException>> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);

    const userFound = await repo.findOne({
      where: { guid },
    });

    if (userFound) {
      Object.assign(userFound, user);
      const userEntity = await repo.save(userFound);
      const emailResult = EmailVO.create(userEntity.email);

      if (emailResult.isErr()) {
        return err(new UserEmailInvalidException());
      }

      return ok(
        new User({
          guid: userEntity.guid,
          name: userEntity.name,
          lastname: userEntity.lastname,
          email: emailResult.value,
          password: userEntity.password,
          refreshToken: userEntity.refreshToken,
          active: userEntity.active,
          roles: userEntity.roles,
        })
      );
    } else {
      return err(new UserNotFoundException());
    }
  }

  async delete(
    guid: string
  ): Promise<Result<User, UserNotFoundException | UserEmailInvalidException>> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);

    const userFound = await repo.findOne({
      where: { guid },
    });

    if (userFound) {
      userFound.active = false;
      const userEntity = await repo.save(userFound);
      const emailResult = EmailVO.create(userEntity.email);

      if (emailResult.isErr()) {
        return err(new UserEmailInvalidException());
      }

      return ok(
        new User({
          guid: userEntity.guid,
          name: userEntity.name,
          lastname: userEntity.lastname,
          email: emailResult.value,
          password: userEntity.password,
          refreshToken: userEntity.refreshToken,
          active: userEntity.active,
          roles: userEntity.roles,
        })
      );
    } else {
      return err(new UserNotFoundException());
    }
  }
}
