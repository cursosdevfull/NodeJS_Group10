import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "user",
  password: "12345",
  database: "curso10",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.entity.ts"],
  migrations: [],
  subscribers: [],
});
