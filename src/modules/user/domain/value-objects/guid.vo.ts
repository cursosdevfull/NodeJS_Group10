import { validate as uuidValidate } from "uuid";
import { UserGuidInvalidException } from "../exceptions/user.exception";
import { ValueObject } from "./vo.class";
import { err, ok, Result } from "neverthrow";
import { DomainException } from "../exceptions/domain.exception";

interface GuidProps {
  value: string;
}

type GuidResult = Result<GuidVO, UserGuidInvalidException | DomainException>;

export class GuidVO extends ValueObject<GuidProps> {
  private constructor(props: GuidProps) {
    super(props);
  }

  static create(guid: string): GuidResult {
    if (!uuidValidate(guid)) {
      return err(new UserGuidInvalidException());
    }

    return ok(new GuidVO({ value: guid }));
  }

  get value(): string {
    return this.props.value;
  }
}
