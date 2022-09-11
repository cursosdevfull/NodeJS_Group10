import { Trace } from "../../../helpers/trace";
import { Logger } from "../../../helpers/logger";
import Driver, { DriverUpdate } from "../domain/driver";
import { DriverRepository } from "../domain/driver.repository";
import { InfoLogger } from "../../../helpers/info-logger";

export default class DriverApplication {
  constructor(private readonly driverRepository: DriverRepository) {}

  list() {
    Logger.getLogger().info("Listing driver");
    return this.driverRepository.list();
  }

  listOne(guid: string) {
    const info: InfoLogger = {
      traceId: Trace.traceId(),
      typeElement: "DriverApplication",
      typeAction: "listOne",
      message: "Listing one driver",
      request: JSON.stringify({ guid }),
      datetime: new Date(),
    };
    Logger.getLogger().info(info);
    return this.driverRepository.listOne(guid);
  }

  insert(driver: Driver) {
    Logger.getLogger().info("Inserting driver");
    return this.driverRepository.insert(driver);
  }

  async update(guid: string, driver: Partial<DriverUpdate>) {
    return this.driverRepository.update(guid, driver);
  }

  async delete(guid: string) {
    return this.driverRepository.delete(guid);
  }
}
