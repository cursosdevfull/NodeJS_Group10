export enum InfrastructureExceptionCode {
  DEFAULT = "DEFAULT",
  DRIVER_DATABASE_EXCEPTION = "DRIVER_DATABASE_EXCEPTION",
}

export class InfrastructureException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = InfrastructureExceptionCode.DEFAULT;
  }
}
