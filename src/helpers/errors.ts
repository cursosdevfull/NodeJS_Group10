import { NextFunction, Request, Response } from "express";
import { IError } from "src/helpers/ierror";

export default class {
  static notFound(req: Request, res: Response): void {
    res.status(404).send("Not Found");
  }

  static genericError(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    res.status(error.status || 500).json({
      message: error.message,
      stack: error.stack,
    });
  }
}
