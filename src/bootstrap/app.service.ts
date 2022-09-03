import yenv from "yenv";

const env = yenv();

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
    return +env.PORT || 4000;
  }

  static get DbConfig(): DB_CONFIG {
    const pass = env.DB_PASS.toString();

    return {
      host: env.DB_HOST || "localhost",
      port: +env.DB_PORT || 3307,
      entities: [env.DB_ENTITIES || "dist/**/*.entity{.ts,.js}"],
      username: env.DB_USER || "user",
      password: pass || "12345",
      database: env.DB_NAME || "curso10",
      synchronize: env.DB_SYNC || false,
      logging: env.DB_LOGG || false,
    };
  }

  static get S3_BUCKET_NAME_PHOTOS(): string {
    return env.S3_BUCKET_NAME_PHOTOS;
  }
}
