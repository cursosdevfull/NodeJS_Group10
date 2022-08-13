import { NextFunction, Request, Response } from "express";

export default class {
  static notFound(req: Request, res: Response): void {
    res.status(404).send("Not Found");
  }

  static genericError(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    res.send(error.message);
  }
}
