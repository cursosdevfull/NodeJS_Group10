import { Request, Response } from "express";
import express, { Application } from "express";
import routerUser from "./modules/user/interfaces/router";
import routerHealth from "./helpers/health";
import HandlerErrors from "./helpers/errors";

class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountHealthCheck();
    this.mountRoutes();
    this.mountErrors();
  }

  mountHealthCheck() {
    this.expressApp.use("/", routerHealth);
  }

  mountRoutes(): void {
    this.expressApp.use("/user", routerUser);
  }

  mountErrors(): void {
    this.expressApp.use(HandlerErrors.notFound);
  }
}

export default new App().expressApp;
