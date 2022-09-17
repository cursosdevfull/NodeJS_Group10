import { In } from 'typeorm';

import DataBaseBootstrap from '../../../bootstrap/database.bootstrap';
import { Role } from '../domain/role';
import { RoleRepository } from '../domain/role.repository';
import { RoleFindByIdsDto } from './dtos/find-by-ids.dto';
import { RoleEntity } from './role.entity';

export default class RoleInfrastructure implements RoleRepository {
  async findByIds(ids: number[]): Promise<Role[]> {
    const repo = DataBaseBootstrap.dataSource.getRepository(RoleEntity);

    const result = await repo.findBy({ roleId: In(ids) });

    return RoleFindByIdsDto.fromDataToDomain(result);
  }
}
