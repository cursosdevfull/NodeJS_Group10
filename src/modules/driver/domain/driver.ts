import { IEntity } from "src/modules/shared/interface/entity.interface";
import { EmailVO } from "./value-objects/email.vo";

interface DriverRequired {
  name: string;
  lastname: string;
  email: EmailVO;
}

interface DriverOptional {
  driverLicense: string;
  active: boolean;
  guid: string;
  photo: string;
}

export type DriverUpdate = {
  name: string;
  lastname: string;
  email: EmailVO;
};

export type DriverProperties = Required<DriverRequired> &
  Partial<DriverOptional>;

export default class Driver implements IEntity<DriverProperties, DriverUpdate> {
  private name: string;
  private lastname: string;
  private readonly email: EmailVO;
  private active: boolean;
  private readonly guid: string;
  private photo: string;
  private driverLicense: string;

  constructor(driverProperties: DriverProperties) {
    this.active = true;
    Object.assign(this, driverProperties);
  }

  properties(): DriverProperties {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      photo: this.photo,
      active: this.active,
      guid: this.guid,
      driverLicense: this.driverLicense,
    };
  }

  update(fields: Partial<DriverUpdate>) {
    Object.assign(this, fields);
  }

  delete() {
    this.active = false;
  }
}
