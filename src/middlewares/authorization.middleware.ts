import { NextFunction, Request, Response } from 'express';

import { IError } from '../helpers/ierror';

export class Authorization {
  static canActive(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const rolesUser = res.locals.roles;

      if (rolesUser.some((role: string) => rolesAllowed.includes(role))) {
        return next();
      } else {
        const error: IError = new Error("Unauthorized");
        error.status = 401;
        next(error);
      }
    };
  }
}
