import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UploadBuilder, UploadOptions } from "./upload.builder";

export interface IUploadImage {
  save(
    options: UploadOptions
  ): (req: Request, res: Response, next: NextFunction) => void;
}

export class FactoryAWS implements IUploadImage {
  save(options: UploadOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log("FactoryAWS");
      console.log(options);
      next();
    };
  }
}

export class FactoryGoogle implements IUploadImage {
  save(options: UploadOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log("FactoryGoogle");
      console.log(options);
      next();
    };
  }
}

export class FactoryAzure implements IUploadImage {
  save(options: UploadOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log("FactoryAzure");
      console.log(options);
      next();
    };
  }
}

export class FactoryWindows implements IUploadImage {
  save(
    options: UploadOptions
  ): (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) => void {
    throw new Error("Method not implemented.");
  }
}

export class FactoryLinux implements IUploadImage {
  save(
    options: UploadOptions
  ): (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) => void {
    throw new Error("Method not implemented.");
  }
}

export class CloudFactory {
  static getFactory(type: string): IUploadImage {
    switch (type) {
      case "AWS":
        return new FactoryAWS();
      case "Google":
        return new FactoryGoogle();
      case "Azure":
        return new FactoryAzure();
      default:
        return new FactoryGoogle();
    }
  }
}

export class OnPremiseFactory {
  static getFactory(type: string): IUploadImage {
    switch (type) {
      case "WINDOWS":
        return new FactoryWindows();
      case "LINUX":
        return new FactoryLinux();
      default:
        return new FactoryWindows();
    }
  }
}

export class AbstractFactory {
  static getAbstract(place: string, type: string) {
    switch (place) {
      case "Cloud":
        return CloudFactory.getFactory(type);
      case "OnPremise":
        return OnPremiseFactory.getFactory(type);
      default:
        return CloudFactory.getFactory(type);
    }
  }
}

const abstractFactory = AbstractFactory.getAbstract("Cloud", "Google");
const abstractFactory2 = AbstractFactory.getAbstract("OnPremise", "WINDOWS");

const options: UploadOptions = new UploadBuilder()
  .addFieldName("photo")
  .addMaxSize(8000000)
  .addAllowedMimeTypes(["image/jpeg", "image/png"])
  .addDestination("uploads")
  .addIsPublic(true)
  .build();

//abstractFactory.save(options);
//abstractFactory2.save(options);
