import User, { UserProperties, UserUpdate } from "../domain/user";
import { UserRepository } from "../domain/user.repository";
import { EmailVO } from "../domain/value-objects/email.vo";
import { UserEntity } from "./user.entity";
import DataBaseBootstrap from "../../../bootstrap/database.bootstrap";
import { err, ok, Result } from "neverthrow";
import { UserNotFoundException } from "../domain/exceptions/user.exception";

export default class UserInfrastructure implements UserRepository {
  async list(): Promise<User[]> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);

    const result = await repo.find({ where: { active: true } });
    return result.map(
      (el: UserEntity) =>
        new User({
          guid: el.guid,
          name: el.name,
          lastname: el.lastname,
          email: EmailVO.create(el.email),
          password: el.password,
          refreshToken: el.refreshToken,
          active: el.active,
        })
    );
  }
  async listOne(guid: string): Promise<Result<User, UserNotFoundException>> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);

    const result = await repo.findOne({ where: { guid } });

    if (!result) {
      return err(new UserNotFoundException());
    } else {
      return ok(
        new User({
          guid: result.guid,
          name: result.name,
          lastname: result.lastname,
          email: EmailVO.create(result.email),
          password: result.password,
          refreshToken: result.refreshToken,
          active: result.active,
        })
      );
    }
  }

  async insert(user: User): Promise<User> {
    const userInsert = new UserEntity();

    const { guid, name, lastname, email, password, refreshToken, active } =
      user.properties();
    Object.assign(userInsert, {
      guid,
      name,
      lastname,
      email: email.value,
      password,
      refreshToken,
      active,
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

      return ok(
        new User({
          guid: userEntity.guid,
          name: userEntity.name,
          lastname: userEntity.lastname,
          email: EmailVO.create(userEntity.email),
          password: userEntity.password,
          refreshToken: userEntity.refreshToken,
          active: userEntity.active,
        })
      );
    } else {
      return err(new UserNotFoundException());
    }
  }

  async delete(guid: string): Promise<Result<User, UserNotFoundException>> {
    const repo = DataBaseBootstrap.dataSource.getRepository(UserEntity);

    const userFound = await repo.findOne({
      where: { guid },
    });

    if (userFound) {
      userFound.active = false;
      const userEntity = await repo.save(userFound);

      return ok(
        new User({
          guid: userEntity.guid,
          name: userEntity.name,
          lastname: userEntity.lastname,
          email: EmailVO.create(userEntity.email),
          password: userEntity.password,
          refreshToken: userEntity.refreshToken,
          active: userEntity.active,
        })
      );
    } else {
      return err(new UserNotFoundException());
    }
  }
}
