import { InvalidUuidError } from "../../errors/invalid-uuid.error";
import * as uuid from "uuid";
import { ValueObject } from "./value-object";

export class UniqueEntityId extends ValueObject<string> {
  constructor(id?: string) {
    super(id ?? uuid.v4());
    this.validate();
  }

  private validate(): void {
    const isValid = uuid.validate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
