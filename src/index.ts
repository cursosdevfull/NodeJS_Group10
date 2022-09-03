import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import RedisBootstrap from "./bootstrap/redis.bootstrap";
import Application from "./app";
import { Bootstrap } from "./bootstrap/bootstrap";
import { Logger } from "./helpers/logger";

const serverBootstrap: Bootstrap = new ServerBootstrap(Application);
const databaseBootstrap: Bootstrap = new DatabaseBootstrap();
const redisBootstrap: Bootstrap = new RedisBootstrap();

(async () => {
  try {
    await databaseBootstrap.initialize();
    await redisBootstrap.initialize();
    await serverBootstrap.initialize();

    Logger.getLogger().info("Server started successfully");
    Logger.getLogger().info("Database started successfully");
    Logger.getLogger().info("Redis started successfully");
  } catch (error) {
    Logger.getLogger().error(error);
  }
})();
