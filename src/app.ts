//import { IncomingMessage, ServerResponse } from "http";
import { Request, Response } from "express";
import Route, { exceptionNotFound, getRoute } from "./routes";
import express, { Application } from "express";

class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.expressApp.get("/user/description", (req: Request, res: Response) => {
      res.send("<h2>User: Sergio</h2>");
    });
  }

  /* static requestListener(request: Request, response: Response) {
    const route: Route | undefined = getRoute(request.url as string);

    if (route) {
      route.execute(request, response);
    } else {
      exceptionNotFound(request, response);
    }
  } */
}

export default new App().expressApp;
