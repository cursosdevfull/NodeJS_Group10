import Driver, { DriverProperties, DriverUpdate } from "../domain/driver";
import { DriverRepository } from "../domain/driver.repository";
import { EmailVO } from "../domain/value-objects/email.vo";
import { DriverEntity } from "./driver.entity";
import DataBaseBootstrap from "../../../bootstrap/database.bootstrap";
import { err, ok, Result } from "neverthrow";
import {
  DriverEmailInvalidException,
  DriverNotFoundException,
} from "../domain/exceptions/driver.exception";
import { DriverDatabaseException } from "./exceptions/driver.exception";
import { Trace } from "../../../helpers/trace";
import { Logger } from "../../../helpers/logger";
import { InfoLogger } from "../../../helpers/info-logger";

export default class DriverInfrastructure implements DriverRepository {
  async list(): Promise<Driver[]> {
    console.log(DriverEntity);
    const repo = DataBaseBootstrap.dataSource.getRepository(DriverEntity);

    const result = await repo.find({ where: { active: true } });
    return result.map((el: DriverEntity) => {
      const emailResult = EmailVO.create(el.email);
      if (emailResult.isErr()) {
        throw new DriverEmailInvalidException();
      }

      return new Driver({
        guid: el.guid,
        name: el.name,
        lastname: el.lastname,
        email: emailResult.value,
        photo: el.photo,
        driverLicense: el.driverLicense,
        active: el.active,
      });
    });
  }
  async listOne(
    guid: string
  ): Promise<
    Result<Driver, DriverNotFoundException | DriverEmailInvalidException>
  > {
    const repo = DataBaseBootstrap.dataSource.getRepository(DriverEntity);

    const result = await repo.findOne({ where: { guid } });
    const emailResult = EmailVO.create(result.email);

    if (emailResult.isErr()) {
      return err(new DriverEmailInvalidException());
    } else {
      return err(new DriverEmailInvalidException());
    }

    /* if (!result) {
      return err(new DriverNotFoundException());
    } else {
      const info: InfoLogger = {
        traceId: Trace.traceId(),
        typeElement: "DriverInfrastructure",
        typeAction: "listOne",
        message: "Listing one driver",
        request: JSON.stringify({ guid }),
        datetime: new Date(),
      };
      Logger.getLogger().info(info);

      return ok(
        new Driver({
          guid: result.guid,
          name: result.name,
          lastname: result.lastname,
          email: emailResult.value,
          photo: result.photo,
          driverLicense: result.driverLicense,
          active: result.active,
        })
      );
    } */
  }

  async insert(
    driver: Driver
  ): Promise<Result<Driver, DriverDatabaseException>> {
    const driverInsert = new DriverEntity();

    const { guid, name, lastname, email, photo, driverLicense, active } =
      driver.properties();
    Object.assign(driverInsert, {
      guid,
      name,
      lastname,
      email: email.value,
      photo,
      driverLicense,
      active,
    });

    try {
      await DataBaseBootstrap.dataSource
        .getRepository(DriverEntity)
        .save(driverInsert);
      return ok(driver);
    } catch (error) {
      return err(new DriverDatabaseException(error.sqlMessage));
    }
  }
  async update(
    guid: string,
    driver: Partial<DriverUpdate>
  ): Promise<Result<Driver, DriverNotFoundException>> {
    const repo = DataBaseBootstrap.dataSource.getRepository(DriverEntity);

    const driverFound = await repo.findOne({
      where: { guid },
    });

    if (driverFound) {
      Object.assign(driverFound, driver);
      const driverEntity = await repo.save(driverFound);
      const emailResult = EmailVO.create(driverEntity.email);

      if (emailResult.isErr()) {
        return err(new DriverEmailInvalidException());
      }

      return ok(
        new Driver({
          guid: driverEntity.guid,
          name: driverEntity.name,
          lastname: driverEntity.lastname,
          email: emailResult.value,
          photo: driverEntity.photo,
          driverLicense: driverEntity.driverLicense,
          active: driverEntity.active,
        })
      );
    } else {
      return err(new DriverNotFoundException());
    }
  }

  async delete(
    guid: string
  ): Promise<
    Result<Driver, DriverNotFoundException | DriverEmailInvalidException>
  > {
    const repo = DataBaseBootstrap.dataSource.getRepository(DriverEntity);

    const driverFound = await repo.findOne({
      where: { guid },
    });

    if (driverFound) {
      driverFound.active = false;
      const driverEntity = await repo.save(driverFound);
      const emailResult = EmailVO.create(driverEntity.email);

      if (emailResult.isErr()) {
        return err(new DriverEmailInvalidException());
      }

      return ok(
        new Driver({
          guid: driverEntity.guid,
          name: driverEntity.name,
          lastname: driverEntity.lastname,
          email: emailResult.value,
          photo: driverEntity.photo,
          driverLicense: driverEntity.driverLicense,
          active: driverEntity.active,
        })
      );
    } else {
      return err(new DriverNotFoundException());
    }
  }
}
