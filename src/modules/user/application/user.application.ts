import User from "../domain/user";
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

  update(user: User) {
    return this.userRepository.update(user);
  }

  delete(user: User) {
    return this.userRepository.delete(user);
  }
}
