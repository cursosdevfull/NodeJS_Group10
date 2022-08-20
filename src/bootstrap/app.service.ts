export interface DB_CONFIG {
  host: string;
  port: number;
  entities: string[];
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export class AppService {
  static get PORT(): number {
    return +process.env.PORT || 4000;
  }

  static get DbConfig(): DB_CONFIG {
    return {
      host: process.env.DB_HOST || "localhost",
      port: +process.env.DB_PORT || 3307,
      entities: [process.env.DB_ENTITIES || "dist/**/*.entity{.ts,.js}"],
      username: process.env.DB_USER || "user",
      password: process.env.DB_PASS || "12345",
      database: process.env.DB_NAME || "curso10",
      synchronize: process.env.DB_SYNC === "true" ? true : false,
      logging: process.env.DB_LOGG === "true" ? true : false,
    };
  }
}
