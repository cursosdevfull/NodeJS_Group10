import { Role } from './role';

export interface RoleRepository {
  findByIds(ids: number[]): Promise<Role[]>;
}
