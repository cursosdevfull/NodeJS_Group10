import { NextFunction, Request, Response } from "express";
import { IError } from "../helpers/ierror";
import { InfoLogger } from "./info-logger";
import { Logger } from "./logger";
import { Trace } from "./trace";

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
    const objError: IError = {
      message: error.message,
      status: error.status ?? 500,
      traceId: Trace.traceId(),
      name: error.name,
      stack: error.stack,
    };

    const info: InfoLogger = {
      traceId: Trace.traceId(),
      typeElement: "GenericError",
      typeAction: "genericError",
      message: "Generic Error",
      request: JSON.stringify(objError),
      datetime: new Date(),
    };

    Logger.getLogger().info(info);

    const objErrorToFrontend = Object.assign({}, objError);
    delete objErrorToFrontend.stack;

    res.status(objErrorToFrontend.status).json(objErrorToFrontend);
  }
}
