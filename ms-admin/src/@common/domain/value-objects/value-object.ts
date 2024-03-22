import { deepFreeze } from "../utils/object.utils";

export abstract class ValueObject<T = unknown> {
  private readonly _value: T;

  constructor(value: T) {
    this._value =
      value && typeof value === "object" ? deepFreeze(value) : value;
  }

  get value(): T {
    return this._value;
  }

  toString = () => {
    const valueString = String(this.value);
    return valueString === "[object Object]"
      ? JSON.stringify(this.value)
      : valueString;
  };
}
