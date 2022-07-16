import User from "../domain/user";
import { UserRepository } from "../domain/user.repository";

const users: User[] = [
  new User({
    id: 1,
    name: "John",
    lastname: "Dick",
    email: "johndick@correo.com",
    password: "123",
    active: true,
    refreshToken: "abcde",
  }),
  new User({
    id: 2,
    name: "Carlos",
    lastname: "Astarte",
    email: "carlos@correo.com",
    password: "12345",
    active: true,
    refreshToken: "abcdefg",
  }),
];

export default class UserInfrastructure implements UserRepository {
  list(): User[] {
    return users;
  }
  listOne(id: number): User {
    return Object.assign(
      {},
      users.find((el: User) => el.properties().id === id)
    );
  }
  insert(user: User): void {
    console.log("user inserted", user);
  }
  update(user: User): void {
    user.delete();
  }
  delete(user: User): void {
    console.log("user deleted", user);
    user.delete();
  }
}
