import { IEntity } from "src/modules/shared/interface/entity.interface";

interface UserRequired {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface UserOptional {
  refreshToken: string;
  active: boolean;
}

type UserUpdate = {
  name: string;
  lastname: string;
  password: string;
  refreshToken: string;
  active: boolean;
};

export type UserProperties = Required<UserRequired> & Partial<UserOptional>;

export default class User implements IEntity<UserProperties, UserUpdate> {
  private readonly id: number;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private refreshToken: string;
  private active: boolean | null;

  constructor(userProperties: UserProperties) {
    this.active = true;
    Object.assign(this, userProperties);
  }

  properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken,
      active: this.active,
    };
  }

  update(fields: UserUpdate) {
    Object.assign(this, fields);
  }

  delete() {
    this.active = false;
  }
}
