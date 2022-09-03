import { NextFunction, Request, Response } from "express";
import RedisBootstrap from "../bootstrap/redis.bootstrap";

export default class Cache {
  static handle(prefix: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let key = prefix;

      if (req.query) {
        for (const prop in req.query) {
          key += `_${prop}:${req.query[prop]}`;
        }
      }

      if (req.params) {
        for (const prop in req.params) {
          key += `_${prop}:${req.params[prop]}`;
        }
      }

      if (req.body) {
        for (const prop in req.body) {
          key += `_${prop}:${req.body[prop]}`;
        }
      }

      const cached = await RedisBootstrap.get(key);

      if (cached) {
        console.log("Response from cache");
        return res.json(JSON.parse(cached));
      } else {
        res.locals.cacheKey = key;
        next();
      }
    };
  }
}
