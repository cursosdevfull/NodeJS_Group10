import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { IError } from "src/helpers/ierror";
import { DriverInsertValidator } from "../validators/driver.validator";

export class DriverMiddleware {
  static async ValidateInsert(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, driverLicense, photo } = req.body;

    const driverInsertValidator = new DriverInsertValidator();
    Object.assign(driverInsertValidator, {
      name,
      lastname,
      email,
      driverLicense,
      photo,
    });
    /* driverInsertValidator.name = name;
    driverInsertValidator.lastname = lastname;
    driverInsertValidator.email = email;
    driverInsertValidator.driverLicense = driverLicense;
    driverInsertValidator.photo = photo; */

    const errors = await validate(driverInsertValidator);

    if (errors.length > 0) {
      const listErrors = errors
        .map((err: any) => err.constraints)
        .map((err: any) => {
          let messages = "";
          Object.keys(err).forEach((prop: string) => {
            messages += `${err[prop]}\n`;
          });
          return messages;
        });
      const error: IError = new Error("Invalid parameters");
      error.status = 422;
      error.stack = JSON.stringify(listErrors);

      return next(error);
    }

    next();
  }
}

export const MiddlewareListOne: ((
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>)[] = [DriverMiddleware.ValidateInsert];
