import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DriverEntity {
  @PrimaryColumn()
  guid: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  photo: string;

  @Column({ type: "varchar", length: 100 })
  driverLicense: string;

  @Column({ type: "boolean", default: true })
  active: boolean;
}
