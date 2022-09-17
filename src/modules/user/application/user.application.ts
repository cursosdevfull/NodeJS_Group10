import User, { UserUpdate } from '../domain/user';
import { UserRepository } from '../domain/user.repository';

export default class UserApplication {
  constructor(private readonly userRepository: UserRepository) {}

  list() {
    return this.userRepository.list();
  }

  listOne(guid: string) {
    return this.userRepository.listOne(guid);
  }

  async insert(user: User) {
    return this.userRepository.insert(user);
  }

  async update(guid: string, user: Partial<UserUpdate>) {
    return this.userRepository.update(guid, user);
  }

  async delete(guid: string) {
    return this.userRepository.delete(guid);
  }
}
