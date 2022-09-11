import { Auth, AuthProperties } from "./auth";

export class AuthFactory {
  static create(authProperties: AuthProperties): Auth {
    
    return new Auth(authProperties);
  }
}
