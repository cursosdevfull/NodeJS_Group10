import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import Application from "./app";
import { Bootstrap } from "./bootstrap/bootstrap";

const serverBootstrap: Bootstrap = new ServerBootstrap(Application);
const databaseBootstrap: Bootstrap = new DatabaseBootstrap();

(async () => {
  try {
    //const taskAsync = [
    await databaseBootstrap.initialize(),
      await serverBootstrap.initialize(),
      //];

      //await Promise.all(taskAsync);
      console.log("Server started successfully");
    console.log("Database started successfully");
  } catch (error) {
    console.log(error);
  }
})();
