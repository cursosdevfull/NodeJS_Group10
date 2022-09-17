import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

import { RoleEntity } from '../../role/infrastructure/role.entity';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  guid: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 100 })
  refreshToken: string;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @ManyToMany((type) => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];
}
