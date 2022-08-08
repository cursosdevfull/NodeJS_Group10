import User, { UserProperties } from "./user";

export interface UserRepository {
  list(): UserProperties[];
  listOne(guid: string): User;
  insert(user: User): Promise<UserProperties>;
  update(user: User): UserProperties;
}
