import { Router } from "express";
import { UploadBuilder } from "../../../../core/infrastructure/upload.builder";
import {
  FactoryAWS,
  IUploadImage,
} from "../../../../core/infrastructure/upload.middleware";
import Cache from "../../../../helpers/cache";
import DriverApplication from "../../application/driver.application";
import { DriverRepository } from "../../domain/driver.repository";
import DriverInfrastructure from "../../infrastructure/driver.infrastructure";
import Controller from "./controller";
import { DriverMiddleware } from "./middlewares/driver.middleware";

const infrastructure: DriverRepository = new DriverInfrastructure();
const application = new DriverApplication(infrastructure);
const controller = new Controller(application);

const uploadMiddleware: IUploadImage = new FactoryAWS();

class DriverRouter {
  readonly expressRouter;
  private readonly prefix = "DRIVERS";

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.get("/", Cache.handle(this.prefix), controller.list);
    this.expressRouter.get(
      "/:guid",
      Cache.handle(this.prefix),
      controller.listOne
    );
    this.expressRouter.post(
      "/",
      uploadMiddleware.save(
        new UploadBuilder()
          .addFieldName("photo")
          .addMaxSize(8000000)
          .addAllowedMimeTypes(["image/jpeg", "image/png"])
          .addDestination("drivers/photos")
          .addIsPublic(true)
          .build()
      ),
      DriverMiddleware.ValidateInsert,
      controller.insert
    );
    this.expressRouter.put("/:guid", controller.update);
    this.expressRouter.delete("/:guid", controller.delete);
  }
}

export default new DriverRouter().expressRouter;
