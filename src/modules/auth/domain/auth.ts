export type AuthProperties = Required<{ email: string; password: string }>;

export class Auth {
  private readonly email: string;
  private readonly password: string;

  constructor(authProperties: AuthProperties) {
    Object.assign(this, authProperties);
  }

  properties(): AuthProperties {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
