import User from "../domain/user";
import { UserRepository } from "../domain/user.repository";

const users: User[] = [
  new User({
    //id: 1,
    name: "John",
    lastname: "Dick",
    email: "johndick@correo.com",
    password: "123",
    //active: true,
    //refreshToken: "abcde",
    //guid: "5981d638-8b3d-4c82-a3ae-6c2aeeabe8cd",
  }),
  new User({
    //id: 2,
    name: "Carlos",
    lastname: "Astarte",
    email: "carlos@correo.com",
    password: "12345",
    //active: true,
    //refreshToken: "abcdefg",
    //guid: "1506eb31-af0f-403f-b811-78dec4206cab",
  }),
];

export default class UserInfrastructure implements UserRepository {
  list(): User[] {
    return users;
  }
  listOne(guid: string): User {
    return Object.assign(
      {},
      users.find((el: User) => el.properties().guid === guid)
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
