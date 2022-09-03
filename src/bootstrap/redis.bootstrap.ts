import { Bootstrap } from "./bootstrap";
import { AppService, REDIS_CONFIG } from "./app.service";
import IORedis from "ioredis";

let appRedis: any;

export default class extends Bootstrap {
  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      const redisConfig: REDIS_CONFIG = AppService.RedisConfig;

      const client = new IORedis(redisConfig);
      client
        .on("connect", () => {
          console.log("Connected to Redis");
          resolve(true);
        })
        .on("error", (err) => {
          console.log("Error connecting to Redis");
          reject(err);
        });

      appRedis = client;
    });
  }

  getConnection() {
    return appRedis;
  }

  static async get(key: string) {
    return await appRedis.get(key);
  }

  static async set(key: string, value: string) {
    return await appRedis.set(key, value, "PX", 1000 * 60 * 60 * 24);
  }

  static async clear(prefix: string = "") {
    const keys = await appRedis.keys(`${prefix}*`);
    const pipeline = appRedis.pipeline();

    keys.forEach((key: string) => {
      pipeline.del(key);
    });

    return pipeline.exec();
  }
}
