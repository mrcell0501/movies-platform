import { ClassValidatorFields } from "./class-validator-fields";
import * as libClassValidator from "class-validator";

class Stub extends ClassValidatorFields<{ field: string }> {}

describe("ClassValidatorFields", () => {
  it("should initialize correctly", () => {
    const validator = new Stub();
    expect(validator.data).toBeNull();
    expect(validator.errors).toBeNull();
  });

  it("should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([
      {
        property: "field",
        constraints: {
          isString: "The field field must be a string",
        },
      },
    ]);

    const validator = new Stub();
    const result = validator.validate({ field: null });

    expect(spyValidateSync).toHaveBeenCalledTimes(1);
    expect(result).toBeFalsy();
    expect(validator.data).toBeNull();
    expect(validator.errors).toBeTruthy();
  });

  it("should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([]);

    const validator = new Stub();
    const result = validator.validate({ field: null });

    expect(spyValidateSync).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
    expect(validator.data).toBeTruthy();
    expect(validator.errors).toBeNull();
  });
});
