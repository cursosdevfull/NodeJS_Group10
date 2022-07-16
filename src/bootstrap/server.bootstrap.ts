import http from "http";
//import { IncomingMessage, ServerResponse } from "http";
import { Application, Request, Response } from "express";

export abstract class Bootstrap {
  abstract initialize(): Promise<any>;
}

export default class extends Bootstrap {
  constructor(
    private readonly app: Application
  ) //private readonly requestListener: (req: Request, res: Response) => void
  {
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
