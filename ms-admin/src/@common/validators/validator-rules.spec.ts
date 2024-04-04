import { ValidatorRules } from "./validator-rules";

describe("ValidatorRules", () => {
  const nullAndUndefinedValues: null | undefined[] = [null, undefined];

  it("should throw error when value is required but not passed", () => {
    for (const value of nullAndUndefinedValues) {
      expect(() => ValidatorRules.values("field", value).required()).toThrow(
        new Error("The field field is required")
      );
    }
  });

  it("should throw error when value is not a boolean", () => {
    const nonBooleanValues = [1, 0, "true", "false", "", {}, []];

    for (const nonBooleanValue of nonBooleanValues) {
      expect(() =>
        ValidatorRules.values("field", nonBooleanValue).boolean()
      ).toThrow(new Error("The field field must be a boolean"));
    }
  });

  it("should throw error when value is not a string", () => {
    const nonStringValues = [1, 0, true, false, [], {}];

    for (const nonStringValue of nonStringValues) {
      expect(() =>
        ValidatorRules.values("field", nonStringValue).string()
      ).toThrow(new Error("The field field must be a string"));
    }
  });

  it("should throw error when value is not a number", () => {
    const nonNumberValues = ["1", "0", true, false, "", {}, []];

    for (const nonNumberValue of nonNumberValues) {
      expect(() =>
        ValidatorRules.values("field", nonNumberValue).number()
      ).toThrow(new Error("The field field must be a number"));
    }
  });

  it("should throw error when value is larger than max length", () => {
    expect(() =>
      ValidatorRules.values("field", "12345678901").maxLength(10)
    ).toThrow(new Error("The field field must be less than 10 characters"));
  });

  it("should not throw error when value is null or undefined for number, boolean and string", () => {
    for (const value of nullAndUndefinedValues) {
      expect(() =>
        ValidatorRules.values("field", value).number()
      ).not.toThrow();
      expect(() =>
        ValidatorRules.values("field", value).boolean()
      ).not.toThrow();
      expect(() =>
        ValidatorRules.values("field", value).string()
      ).not.toThrow();
    }
  });
});
