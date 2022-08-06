import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Medic } from "./Medic.entity";

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany((type) => Medic, (medic) => medic.hospital, {
    cascade: true,
  })
  medics: Medic[];
}
