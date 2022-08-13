import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { UserListOneValidator } from "../validators/user.validator";

class UserMiddleware {
  static async ValidateListOne(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { guid } = req.params;
    const userListOneValidator = new UserListOneValidator();
    userListOneValidator.guid = guid;

    const errors = await validate(userListOneValidator);
    console.log(guid);
    console.log(errors);
    if (errors.length > 0) {
      console.log(errors);
      //throw new Error("Invalid request");
      return next(new Error("Invalid request"));
    }

    next();
  }
}

export const MiddlewareListOne: ((
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>)[] = [UserMiddleware.ValidateListOne];
