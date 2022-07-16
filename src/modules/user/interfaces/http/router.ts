import { Router } from "express";
import Controller from "./controller";

const controller = new Controller();

class UserRouter {
  readonly expressRouter;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.get("/description", controller.description);
    this.expressRouter.get("/list", controller.list);
    this.expressRouter.get("/detail", controller.detail);
    this.expressRouter.get("/delete", controller.delete);
  }
}

export default new UserRouter().expressRouter;
