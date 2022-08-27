import { DomainException, DomainExceptionCode } from "./domain.exception";
export class DriverNameRequiredException extends DomainException {
  constructor() {
    super(DriverNameRequiredException.getMessage());
    this.name = DomainExceptionCode.DRIVER_NAME_REQUIRED;
  }

  static getMessage() {
    return "Name is required";
  }
}

export class DriverLastnameRequiredException extends DomainException {
  constructor() {
    super(DriverNameRequiredException.getMessage());
    this.name = DomainExceptionCode.DRIVER_NAME_REQUIRED;
  }

  static getMessage() {
    return "Name is required";
  }
}

export class DriverEmailRequiredException extends DomainException {
  constructor() {
    super(DriverEmailRequiredException.getMessage());
    this.name = DomainExceptionCode.DRIVER_EMAIL_REQUIRED;
  }

  static getMessage() {
    return "Email is required";
  }
}

export class DriverEmailInvalidException extends DomainException {
  constructor() {
    super(DriverEmailInvalidException.getMessage());
    this.name = DomainExceptionCode.DRIVER_EMAIL_INVALID;
  }

  static getMessage() {
    return "Email is invalid";
  }
}

export class DriverPasswordRequiredException extends DomainException {
  constructor() {
    super(DriverPasswordRequiredException.getMessage());
    this.name = DomainExceptionCode.DRIVER_PASSWORD_REQUIRED;
  }

  static getMessage() {
    return "Password is invalid";
  }
}

export class DriverPasswordLengthInvalidException extends DomainException {
  constructor(password: string) {
    super(DriverPasswordLengthInvalidException.getMessage(password));
    this.name = DomainExceptionCode.DRIVER_PASSWORD_LENGTH_INVALID;
  }

  static getMessage(password: string) {
    return `Password must be more than 4 characters, but '${password}' has only ${password.length}`;
  }
}

export class DriverGuidInvalidException extends DomainException {
  constructor() {
    super(DriverGuidInvalidException.getMessage());
    Object.setPrototypeOf(this, DriverGuidInvalidException.prototype);
    this.name = DomainExceptionCode.DRIVER_GUID_INVALID;
  }

  static getMessage() {
    return "Guid is invalid";
  }
}

export class DriverNotFoundException extends DomainException {
  constructor() {
    super(DriverNotFoundException.getMessage());
    this.name = DomainExceptionCode.DRIVER_NOT_FOUND;
  }

  static getMessage() {
    return "Driver not found";
  }
}
