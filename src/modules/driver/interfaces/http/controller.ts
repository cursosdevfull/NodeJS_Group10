import { NextFunction, Request, Response } from "express";
import DriverApplication from "../../application/driver.application";
import Driver from "../../domain/driver";
import DriverFactory from "../../domain/driver-factory";
import { EmailVO } from "../../domain/value-objects/email.vo";
import { DriverInsertMapping } from "./dto/response/driver-insert.dto";
import { DriverListOneMapping } from "./dto/response/driver-list-one.dto";
import {
  DriverListDTO,
  DriverListMapping,
} from "./dto/response/driver-list.dto";
import { GuidVO } from "../../domain/value-objects/guid.vo";
import { DriverDeleteMapping } from "./dto/response/driver-delete.dto";
import { IError } from "../../../../helpers/ierror";
import RedisBootstrap from "../../../../bootstrap/redis.bootstrap";
import { Trace } from "../../../../helpers/trace";
import { Logger } from "../../../../helpers/logger";
import { InfoLogger } from "../../../../helpers/info-logger";

export default class {
  constructor(private application: DriverApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    const list = await this.application.list();
    const result: DriverListDTO = new DriverListMapping().execute(
      list.map((driver) => driver.properties())
    );

    RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(result));
    res.json(result);
  }

  async listOne(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params;

    const info: InfoLogger = {
      traceId: Trace.traceId(true),
      typeElement: "Driver Controller",
      typeAction: "listOne",
      message: `List one driver with guid: ${guid}`,
      request: JSON.stringify({ guid }),
      datetime: new Date(),
    };
    Logger.getLogger().info(JSON.stringify(info));

    const guidResult = GuidVO.create(guid);
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message);
      err.status = 411;
      return next(err);
    }

    const driverResult = await this.application.listOne(guid);

    if (driverResult.isErr()) {
      const err: IError = new Error(driverResult.error.message);
      err.status = 404;
      //return res.status(404).send(driverResult.error.message);
      return next(err);
    } else if (driverResult.isOk()) {
      const result = new DriverListOneMapping().execute(
        driverResult.value.properties()
      );

      const responseResult = {
        traceId: Trace.traceId(),
        result,
      };

      RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(responseResult));
      return res.json(responseResult);
    }
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, photo, driverLicense } = req.body;

    const emailResult = EmailVO.create(email);
    if (emailResult.isErr()) {
      const err: IError = new Error(emailResult.error.message);
      err.status = 411;
      return next(err);
    }

    const driverResult = await new DriverFactory().create(
      name,
      lastname,
      emailResult.value,
      photo,
      driverLicense
    );

    if (driverResult.isErr()) {
      const err: IError = new Error(driverResult.error.message);
      err.status = 411;
      return next(err);
      //return res.status(411).send(driverResult.error.message);
    } else {
      const dataResult = await this.application.insert(driverResult.value);
      if (dataResult.isErr()) {
        const err: IError = new Error(dataResult.error.message);
        err.status = 411;
        return next(err);
      }

      const result = new DriverInsertMapping().execute(
        dataResult.value.properties()
      );

      RedisBootstrap.clear("DRIVERS");
      res.json(result);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params;
    const fieldsToUpdate = req.body;

    const guidResult = GuidVO.create(guid);
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message);
      err.status = 411;
      return next(err);
    }

    const dataResult = await this.application.update(guid, fieldsToUpdate);
    if (dataResult.isErr()) {
      const err: IError = new Error(dataResult.error.message);
      err.status = 411;
      return next(err);
    } else {
      const result = new DriverInsertMapping().execute(
        dataResult.value.properties()
      );
      res.json(result);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params;

    const guidResult = GuidVO.create(guid);
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message);
      err.status = 411;
      return next(err);
    }

    const dataResult = await this.application.delete(guid);
    if (dataResult.isErr()) {
      const err: IError = new Error(dataResult.error.message);
      err.status = 404;
      return next(err);
    } else {
      const result = new DriverDeleteMapping().execute(
        dataResult.value.properties()
      );
      res.json(result);
    }
  }
}
