import http from "http";
import { IncomingMessage, ServerResponse } from "http";

export abstract class Bootstrap {
  abstract initialize(): Promise<any>;
}

export default class extends Bootstrap {
  //requestListener: (req: IncomingMessage, res: ServerResponse) => void;

  constructor(
    private readonly requestListener: (
      req: IncomingMessage,
      res: ServerResponse
    ) => void
  ) {
    super();
    // this.requestListener = requestListener;
  }

  initialize() {
    console.log(this.requestListener);
    return new Promise<any>((resolve, reject) => {
      const server = http.createServer(this.requestListener);

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
