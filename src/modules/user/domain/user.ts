import { IEntity } from "src/modules/shared/interface/entity.interface";
import { v4 as uuidv4 } from "uuid";
interface UserRequired {
  //id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  //guid: string;
}

interface UserOptional {
  refreshToken: string;
  active: boolean;
  guid: string;
}

type UserUpdate = {
  name: string;
  lastname: string;
  password: string;
  refreshToken: string;
  active: boolean;
};

export type UserInsert = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserProperties = Required<UserRequired> & Partial<UserOptional>;

export default class User implements IEntity<UserProperties, UserUpdate> {
  //private readonly id: number;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private refreshToken: string;
  private active: boolean | null;
  private readonly guid: string;

  constructor(userProperties: UserProperties) {
    this.active = true;
    this.guid = uuidv4();
    this.refreshToken = "";
    Object.assign(this, userProperties);
  }

  properties(): UserProperties {
    return {
      //id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken,
      active: this.active,
      guid: this.guid,
    };
  }

  update(fields: UserUpdate) {
    Object.assign(this, fields);
  }

  delete() {
    this.active = false;
  }
}
