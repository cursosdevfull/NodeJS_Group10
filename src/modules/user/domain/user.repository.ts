import { Result } from "neverthrow";
import { UserNotFoundException } from "./exceptions/user.exception";
import User, { UserUpdate } from "./user";

export interface UserRepository {
  list(): Promise<User[]>;
  listOne(guid: string): Promise<Result<User, UserNotFoundException>>;
  insert(user: User): Promise<User>;
  update(
    guid: string,
    user: Partial<UserUpdate>
  ): Promise<Result<User, UserNotFoundException>>;
  delete(guid: string): Promise<Result<User, UserNotFoundException>>;
}
