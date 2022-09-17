import { Role } from '../../domain/role';
import { RoleEntity } from '../role.entity';

export class RoleFindByIdsDto {
  static fromDataToDomain(roles: RoleEntity[]): Role[] {
    return roles.map((role: RoleEntity) => ({
      roleId: role.roleId,
      name: role.name,
    }));
  }
}
