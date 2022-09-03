import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import multer from "multer";
import multer_s3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { ParsedQs } from "qs";
import { UploadBuilder, UploadOptions } from "./upload.builder";
import yenv from "yenv";
import { IError } from "src/helpers/ierror";

const env = yenv();
export interface IUploadImage {
  save(
    options: UploadOptions
  ): (req: Request, res: Response, next: NextFunction) => void;
}

export class FactoryAWS implements IUploadImage {
  save(options: UploadOptions) {
    return multer({
      limits: { fileSize: options.maxSize },
      storage: multer_s3({
        s3: new S3Client({}),
        bucket: env.S3_BUCKET_NAME_PHOTOS,
        acl: options.isPublic ? "public-read" : "",
        //metadata: (req, file, cb) => {}
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key(req: Request, file, cb) {
          const mimetype = file.mimetype;
          const isFileAllowed = options.allowedMimeTypes.includes(mimetype);

          if (!isFileAllowed) {
            const error: IError = new Error("File type not allowed");
            error.status = 422;
            return cb(error, null);
          }

          const partsFileName = file.originalname.split(".");
          const extension = partsFileName[partsFileName.length - 1];
          const fileName = `${options.destination}/${Date.now()}.${extension}`;
          req.body[options.fieldName] = fileName;
          cb(null, fileName);
        },
      }),
    }).single(options.fieldName);
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
