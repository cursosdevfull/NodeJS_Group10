import jwt from "jwt-simple";
import moment from "moment";
import yenv from "yenv";
import { v4 as uuidv4 } from "uuid";

const env = yenv();

export interface IPayload {
  name: string;
  lastname: string;
  iat: number;
  exp: number;
}

export interface ErrorPayload {
  status: number;
  message: string;
}

export type ResponseValidateToken = IPayload | ErrorPayload;

export enum TOKEN_ERROR {
  TOKEN_EXPIRED = "Token expired",
  TOKEN_INVALID = "Token invalid",
}

export enum TOKEN_ERROR_MESSAGE {
  TOKEN_EXPIRED = "Token expiró",
  TOKEN_INVALID = "Token inválido",
}

export class AuthService {
  static generateAccessToken(user: {
    name: string;
    lastname: string;
    email: string;
    password: string;
    refreshToken: string;
  }): string {
    const { name, lastname } = user;
    const payload: IPayload = {
      name,
      lastname,
      iat: moment().unix(),
      exp: moment().add(10, "minutes").unix(),
    };

    return jwt.encode(payload, env.KEYWORD_SECRET);
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }

  static validateAccessToken(
    accessToken: string
  ): Promise<ResponseValidateToken> {
    console.log("validateAccessToken");
    return new Promise((resolve, reject) => {
      try {
        console.log("validation", accessToken, env.KEYWORD_SECRET);
        const payload = jwt.decode(accessToken, env.KEYWORD_SECRET);
        resolve(payload);
      } catch (error) {
        console.log("error", error);
        if (
          error.message.toLowerCase() ===
          TOKEN_ERROR.TOKEN_EXPIRED.toLowerCase()
        ) {
          reject({
            status: 409,
            message: TOKEN_ERROR_MESSAGE.TOKEN_EXPIRED,
          });
        } else {
          reject({
            status: 401,
            message: TOKEN_ERROR_MESSAGE.TOKEN_INVALID,
          });
        }
      }
    });
  }
}
