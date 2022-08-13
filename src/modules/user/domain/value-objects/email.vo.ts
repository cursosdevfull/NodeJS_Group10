import { ValueObject } from "./vo.class";
import { UserEmailInvalidException } from "../exceptions/user.exception";

interface EmailProps {
  value: string;
}

export class EmailVO extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  static create(email: string) {
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)) {
      throw new UserEmailInvalidException();
    }

    return new EmailVO({ value: email });
  }

  get value(): string {
    return this.props.value;
  }
}
