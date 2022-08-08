import { Bootstrap } from "./bootstrap";
import { DataSource } from "typeorm";

let appDataSource: DataSource;

export default class extends Bootstrap {
  initialize(): Promise<any> {
    const AppDataSource = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "user",
      password: "12345",
      database: "curso10",
      synchronize: true,
      logging: false,
      entities: ["src/**/*.entity.ts"],
      migrations: [],
      subscribers: [],
    });

    appDataSource = AppDataSource;

    return AppDataSource.initialize();
  }

  static get dataSource(): DataSource {
    return appDataSource;
  }
}
