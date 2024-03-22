import { InvalidUuidError } from "../../errors/invalid-uuid.error";
import * as uuid from "uuid";

export class UniqueEntityId {
  public readonly value: string;

  constructor(id?: string) {
    this.value = id ?? uuid.v4();
    this.validate();
  }

  private validate(): void {
    const isValid = uuid.validate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
