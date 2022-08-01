import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  color: string;

  //@OneToOne((type) => User, (user) => user.car)
  //@JoinColumn()
  //@ManyToOne((type) => User, (user) => user.cars)
  @ManyToMany((type) => User, (user) => user.cars)
  @JoinTable()
  users: User[];
}
