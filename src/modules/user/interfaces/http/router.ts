import { Router, Request, Response } from "express";
import UserApplication from "../../application/user.application";
import { UserRepository } from "../../domain/user.repository";
import UserInfrastructure from "../../infrastructure/user.infrastructure";
import Controller from "./controller";

const infrastructure: UserRepository = new UserInfrastructure();
const application = new UserApplication(infrastructure);
const controller = new Controller(application);

class UserRouter {
  readonly expressRouter;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    /*     this.expressRouter.get("/", (req: Request, res: Response) => {
      controller.list(req, res);
    }); */
    this.expressRouter.get("/", controller.list);
    this.expressRouter.get("/:guid", controller.listOne);
    this.expressRouter.post("/", controller.insert);
  }
}

export default new UserRouter().expressRouter;
