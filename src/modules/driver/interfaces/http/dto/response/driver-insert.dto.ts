import { DriverProperties } from "src/modules/driver/domain/driver";
import { DTO } from "./dto.interface";

interface DriverDTO {
  name: string;
  lastname: string;
  email: string;
  guid: string;
}

export type DriverInsertOneDTO = DriverDTO;

export class DriverInsertMapping extends DTO<DriverProperties, DriverInsertOneDTO> {
  execute(data: DriverProperties): DriverInsertOneDTO {
    return {
      name: data.name,
      lastname: data.lastname,
      email: data.email.value,
      guid: data.guid,
    };
  }
}
