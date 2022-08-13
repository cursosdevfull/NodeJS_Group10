import express, { Application } from "express";
import routerUser from "./modules/user/interfaces/http/router";
import routerHealth from "./helpers/health";
import HandlerErrors from "./helpers/errors";

class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountHealthCheck();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountErrors();
  }

  mountMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
  }

  mountHealthCheck() {
    this.expressApp.use("/", routerHealth);
  }

  mountRoutes(): void {
    this.expressApp.use("/user", routerUser);
  }

  mountErrors(): void {
    this.expressApp.use(HandlerErrors.genericError);
    this.expressApp.use(HandlerErrors.notFound);
  }
}

export default new App().expressApp;
