import { ValueObject } from "./vo.class";
import { DriverEmailInvalidException } from "../exceptions/driver.exception";
import { err, ok, Result } from "neverthrow";

interface EmailProps {
  value: string;
}

export type EmailResult = Result<EmailVO, DriverEmailInvalidException>;

export class EmailVO extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  static create(email: string): EmailResult {
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)) {
      return err(new DriverEmailInvalidException());
    }

    return ok(new EmailVO({ value: email }));
  }

  get value(): string {
    return this.props.value;
  }
}
