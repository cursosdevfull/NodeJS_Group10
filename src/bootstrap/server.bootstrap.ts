import http from "http";
import { Application } from "express";
import { Bootstrap } from "./bootstrap";

export default class extends Bootstrap {
  constructor(private readonly app: Application) {
    super();
  }

  initialize() {
    return new Promise<any>((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(3000)
        .on("listening", () => {
          resolve("Promise resolved successfully");
          console.log("listening on port: 3000");
        })
        .on("error", (error) => {
          reject(error);
          console.log(error);
        });
    });
  }

  verifyPort() {}
}
