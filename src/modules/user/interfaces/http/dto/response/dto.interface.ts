/* export interface IDTO<Properties, DTO> {
  execute(data: Properties): DTO;
} */

export abstract class DTO<Properties, DTO> {
  abstract execute(data: Properties): DTO;
}
