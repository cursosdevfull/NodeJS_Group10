import { DataSource } from "typeorm";
import User, { UserProperties } from "../domain/user";
import UserFactory from "../domain/user-factory";
import { UserRepository } from "../domain/user.repository";
import { EmailVO } from "../domain/value-objects/email.vo";
import { UserEntity } from "./user.entity";
import DataBaseBootstrap from "../../../bootstrap/database.bootstrap";

let users: User[] = [];

const promisesUsers = [
  new UserFactory().create(
    "John",
    "Dick",
    EmailVO.create("johndick@correo.com"),
    "123"
  ),
  new UserFactory().create(
    "Carlos",
    "Astarte",
    EmailVO.create("carlos@correo.com"),
    "12345"
  ),
];

Promise.all(promisesUsers).then((result) => (users = result));

/* const users: User[] = [
  new UserFactory().create(
    "John",
    "Dick",
    EmailVO.create("johndick@correo.com"),
    "123"
  ),
  new UserFactory().create(
    "Carlos",
    "Astarte",
    EmailVO.create("carlos@correo.com"),
    "12345"
  ),
]; */

export default class UserInfrastructure implements UserRepository {
  list(): UserProperties[] {
    return users
      .filter((el: User) => el.properties().active)
      .map((el: User) => el.properties());
  }
  listOne(guid: string): User {
    return users
      .filter((el: User) => el.properties().active)
      .find((el: User) => el.properties().guid === guid);
  }

  async insert(user: User): Promise<UserProperties> {
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
    return user.properties();
  }
  update(user: User): any {
    const { guid } = user.properties();
    const userIndex: number = users.findIndex(
      (el: User) => el.properties().guid === guid
    );
    users[userIndex] = user;
    return user;
  }
}
