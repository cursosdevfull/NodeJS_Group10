import http from "http";
import { Application } from "express";
import { Bootstrap } from "./bootstrap";
import { AppService } from "./app.service";

export default class extends Bootstrap {
  constructor(private readonly app: Application) {
    super();
  }

  initialize() {
    return new Promise<any>((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(AppService.PORT)
        .on("listening", () => {
          resolve("Promise resolved successfully");
          console.log(`listening on port: ${AppService.PORT}`);
        })
        .on("error", (error) => {
          reject(error);
          console.log(error);
        });
    });
  }

  verifyPort() {}
}
