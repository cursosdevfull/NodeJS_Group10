import { Request, Response, NextFunction } from "express";
import { AuthService } from "../modules/auth/application/auth.service";
import { IError } from "../helpers/ierror";

export class Authentication {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      const error: IError = new Error("Unauthorized");
      error.status = 401;
      return next(error);
    } else {
      // Bearer <token>
      const [bearer, token] = authorization.split(" ");
      if (bearer.toLowerCase() !== "bearer" || !token) {
        const error: IError = new Error("Unauthorized");
        error.status = 401;
        return next(error);
      }

      AuthService.validateAccessToken(token)
        .then((payload) => {
          return next();
        })
        .catch((err) => {
          const error: IError = new Error(err.message);
          error.status = err.status;
          return next(error);
        });
    }
  }
}
