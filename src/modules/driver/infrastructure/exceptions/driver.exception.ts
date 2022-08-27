import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from "./infrastructure.exception";
export class DriverDatabaseException extends InfrastructureException {
  constructor(message: string) {
    super(DriverDatabaseException.getMessage(message));
    this.name = InfrastructureExceptionCode.DRIVER_DATABASE_EXCEPTION;
  }

  static getMessage(message: string) {
    return `Error in database: ${message}`;
  }
}
