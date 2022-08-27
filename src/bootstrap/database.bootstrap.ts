import { Bootstrap } from "./bootstrap";
import { DataSource } from "typeorm";
import { AppService, DB_CONFIG } from "./app.service";

let appDataSource: DataSource;

export default class extends Bootstrap {
  initialize(): Promise<any> {
    const dbConfig: DB_CONFIG = AppService.DbConfig;

    console.log(dbConfig);

    const AppDataSource = new DataSource({
      type: "mysql",
      ...dbConfig,
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
