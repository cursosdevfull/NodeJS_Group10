import { DataSource } from 'typeorm';

import { AppService, IDbConfig } from './app.service';
import { Bootstrap } from './bootstrap';

let appDataSource: DataSource;

export default class extends Bootstrap {
  initialize(): Promise<any> {
    const dbConfig: IDbConfig = AppService.DbConfig;

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

  close() {
    appDataSource.destroy();
  }
}
