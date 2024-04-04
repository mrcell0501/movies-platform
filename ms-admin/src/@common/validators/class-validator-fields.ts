import { validateSync } from "class-validator";
import { ValidatorFields } from "./validator-fields.interface";

export abstract class ClassValidatorFields<T extends Object>
  implements ValidatorFields<T>
{
  data: T = null;
  errors?: Partial<{ [key in keyof T]: string[] }> = null;

  validate(data: T): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this.errors = errors.reduce(
        (accumulator, current) => ({
          ...accumulator,
          [current.property]: Object.values(current.constraints),
        }),
        {}
      );
    } else {
      this.data = data;
    }

    return !errors.length;
  }
}
