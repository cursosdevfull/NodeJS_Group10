import express, { Application } from 'express';
import multer from 'multer';

import RedisBootstrap from './bootstrap/redis.bootstrap';
import HandlerErrors from './helpers/errors';
import routerHealth from './helpers/health';
import { Authentication } from './middlewares/authentication.middleware';
import { Authorization } from './middlewares/authorization.middleware';
import routerAuth from './modules/auth/interfaces/http/auth.route';
import routerDriver from './modules/driver/interfaces/http/router';
import routerUser from './modules/user/interfaces/http/router';

class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.init();
    this.mountHealthCheck();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountInvalidationCache();
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
    this.expressApp.use(
      "/user",
      Authentication.canActivate,
      Authorization.canActive("ADMINISTRATOR", "SUPER"),
      routerUser
    );
    this.expressApp.use("/driver", routerDriver);
    this.expressApp.use("/auth", routerAuth);
  }

  mountInvalidationCache(): void {
    this.expressApp.get("/invalidation-cache", (req, res) => {
      RedisBootstrap.clear();
      res.send("Cache invalided");
    });
  }

  mountErrors(): void {
    this.expressApp.use(HandlerErrors.notFound);
    this.expressApp.use(HandlerErrors.genericError);
  }
}

export default new App().expressApp;
