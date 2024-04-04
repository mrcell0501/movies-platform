export class ValidatorRules {
  private constructor(
    private readonly field: string,
    private readonly value: unknown
  ) {}

  static values(field: string, value: unknown): ValidatorRules {
    return new ValidatorRules(field, value);
  }
  required(): Omit<this, "required"> {
    if (this.value === null || this.value === undefined || this.value === "") {
      throw new Error(`The field ${this.field} is required`);
    }
    return this;
  }

  string(): Omit<this, "string"> {
    if (!isEmpty(this.value) && typeof this.value !== "string") {
      throw new Error(`The field ${this.field} must be a string`);
    }
    return this;
  }

  boolean(): Omit<this, "boolean"> {
    if (!isEmpty(this.value) && typeof this.value !== "boolean") {
      throw new Error(`The field ${this.field} must be a boolean`);
    }
    return this;
  }

  number(): Omit<this, "number"> {
    if (!isEmpty(this.value) && typeof this.value !== "number") {
      throw new Error(`The field ${this.field} must be a number`);
    }
    return this;
  }

  maxLength(max: number): Omit<this, "maxLength"> {
    if (typeof this.value !== "string") {
      throw new Error(`The field ${this.field} must be a string`);
    }

    if (!isEmpty(this.value) && this.value.length > max) {
      throw new Error(
        `The field ${this.field} must be less than ${max} characters`
      );
    }
    return this;
  }
}

export function isEmpty(value: any) {
  return value === undefined || value === null;
}
