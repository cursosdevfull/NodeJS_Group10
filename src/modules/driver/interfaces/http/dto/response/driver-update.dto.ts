import { DriverProperties } from "src/modules/driver/domain/driver";
import { DTO } from "./dto.interface";

interface DriverDTO {
  name: string;
  lastname: string;
  email: string;
  guid: string;
}

export type DriverUpdateDTO = DriverDTO;

export class DriverUpdateMapping extends DTO<DriverProperties, DriverUpdateDTO> {
  execute(data: DriverProperties): DriverUpdateDTO {
    return {
      name: data.name,
      lastname: data.lastname,
      email: data.email.value,
      guid: data.guid,
    };
  }
}
