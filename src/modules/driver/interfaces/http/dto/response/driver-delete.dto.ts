import { DriverProperties } from "src/modules/driver/domain/driver";
import { DTO } from "./dto.interface";

interface DriverDTO {
  name: string;
  lastname: string;
  email: string;
  guid: string;
}

export type DriverDeleteDTO = DriverDTO;

export class DriverDeleteMapping extends DTO<DriverProperties, DriverDeleteDTO> {
  execute(data: DriverProperties): DriverDeleteDTO {
    return {
      name: data.name,
      lastname: data.lastname,
      email: data.email.value,
      guid: data.guid,
    };
  }
}
