import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ClassValidatorFields } from "./class-validator-fields";

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: StubRules) {
    Object.assign(this, data);
  }
}

class Stub extends ClassValidatorFields<StubRules> {
  validate(data: StubRules): boolean {
    return super.validate(new StubRules(data));
  }
}

describe("ClassValidatorFields Integration Tests", () => {
  it("should validate with errors", () => {
    const validator = new Stub();

    expect(validator.validate({ name: null, price: null })).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
      price: [
        "price should not be empty",
        "price must be a number conforming to the specified constraints",
      ],
    });
  });

  it("should validate without errors", () => {
    const payload = { name: "test", price: 10 };

    const validator = new Stub();

    expect(validator.validate(payload)).toBeTruthy();
    expect(validator.errors).toBeNull();
    expect(validator.data).toStrictEqual(new StubRules(payload));
  });
});
