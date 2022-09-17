import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../user/infrastructure/user.entity';

@Entity({ name: "role" })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @ManyToMany((type) => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
