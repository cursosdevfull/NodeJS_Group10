import { err } from "neverthrow";
import User, { UserProperties, UserUpdate } from "../domain/user";
import { UserRepository } from "../domain/user.repository";

export default class UserApplication {
  constructor(private readonly userRepository: UserRepository) {}

  list() {
    return this.userRepository.list();
  }

  listOne(guid: string) {
    return this.userRepository.listOne(guid);
  }

  insert(user: User) {
    return this.userRepository.insert(user);
  }

  async update(guid: string, user: Partial<UserUpdate>) {
    /*     const searchUserResult = await this.listOne(guid);
    if (searchUserResult.isErr()) {
      return err(new UserNot)
    }
    userToUpdate.update(user); */
    return this.userRepository.update(guid, user);
  }

  async delete(guid: string) {
    /*     const userToDelete = await this.listOne(guid);
    userToDelete.delete();
    return this.userRepository.delete(userToDelete); */
  }
}
