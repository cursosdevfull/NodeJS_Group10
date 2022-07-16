import { Router, Request, Response } from "express";

class RouterHealth {
  readonly expressRouter: Router;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.get("/", (req: Request, res: Response) =>
      res.send("All is ok")
    );
    this.expressRouter.get("/healthcheck", (req: Request, res: Response) =>
      res.send("All is ok")
    );
    this.expressRouter.get("/healthz", (req: Request, res: Response) =>
      res.send("All is ok")
    );
  }
}

export default new RouterHealth().expressRouter;
