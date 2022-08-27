import express, { Application } from "express";
import routerUser from "./modules/user/interfaces/http/router";
import routerDriver from "./modules/driver/interfaces/http/router";
import routerHealth from "./helpers/health";
import HandlerErrors from "./helpers/errors";
import multer from "multer";
class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.init();
    this.mountHealthCheck();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountErrors();
  }

  init() {
    multer({
      limits: {
        fileSize: 8000000,
      },
    });
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
    this.expressApp.use("/driver", routerDriver);
  }

  mountErrors(): void {
    this.expressApp.use(HandlerErrors.notFound);
    this.expressApp.use(HandlerErrors.genericError);
  }
}

export default new App().expressApp;
