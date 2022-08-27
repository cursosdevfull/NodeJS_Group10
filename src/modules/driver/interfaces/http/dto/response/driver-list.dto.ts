import Driver, { DriverProperties } from "src/modules/driver/domain/driver";
import { DTO } from "./dto.interface";

interface DriverDTO {
  name: string;
  lastname: string;
  guid: string;
  email: string;
}

export type DriverListDTO = DriverDTO[];

export class DriverListMapping extends DTO<DriverProperties[], DriverListDTO> {
  execute(data: DriverProperties[]): DriverListDTO {
    return data.map((driver: DriverProperties) => {
      return {
        name: driver.name,
        lastname: driver.lastname,
        guid: driver.guid,
        email: driver.email.value,
      };
    });
  }
}
