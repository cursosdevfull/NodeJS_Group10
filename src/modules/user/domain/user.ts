import { IEntity } from 'src/modules/shared/interface/entity.interface';

import { Role } from '../../role/domain/role';
import { EmailVO } from './value-objects/email.vo';

interface UserRequired {
  name: string;
  lastname: string;
  email: EmailVO;
  password: string;
  roles: number[] | string[] | Role[];
}

interface UserOptional {
  refreshToken: string;
  active: boolean;
  guid: string;
}

export type UserUpdate = {
  name: string;
  lastname: string;
  email: EmailVO;
  password: string;
  refreshToken: string;
  roles: number[] | string[] | Role[];
};

export type UserProperties = Required<UserRequired> & Partial<UserOptional>;

export default class User implements IEntity<UserProperties, UserUpdate> {
  private name: string;
  private lastname: string;
  private readonly email: EmailVO;
  private password: string;
  private refreshToken: string;
  private active: boolean;
  private readonly guid: string;
  private roles: number[] | string[] | Role[];

  constructor(userProperties: UserProperties) {
    this.active = true;
    Object.assign(this, userProperties);
  }

  properties(): UserProperties {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken,
      active: this.active,
      guid: this.guid,
      roles: this.roles,
    };
  }

  update(fields: Partial<UserUpdate>) {
    Object.assign(this, fields);
  }

  delete() {
    this.active = false;
  }
}
