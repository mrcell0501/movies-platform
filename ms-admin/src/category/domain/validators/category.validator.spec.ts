import {
  CreateCategoryValidator,
  UpdateCategoryValidator,
} from "./category.validator";

describe("Create Category Validator", () => {
  it("should return true if at least name is passed", () => {
    const payload = { name: "Movie" };
    const validator = new CreateCategoryValidator();

    expect(validator).toBeInstanceOf(CreateCategoryValidator);
    expect(validator.validate(payload)).toBeTruthy();
  });

  it("should return true if other fields are passed", () => {
    const fullPayload = {
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: new Date(),
    };
    const entries = Object.entries(fullPayload);

    let payload = {} as any;
    for (const [key, value] of entries) {
      payload = { ...payload, [key]: value };
      const validator = new CreateCategoryValidator();
      expect(validator).toBeInstanceOf(CreateCategoryValidator);
      expect(validator.validate(payload)).toBeTruthy();
    }
  });

  it("should return false if name is invalid", () => {
    const payload = { name: 123 } as any;
    const validator = new CreateCategoryValidator();

    expect(validator).toBeInstanceOf(CreateCategoryValidator);
    expect(validator.validate(payload)).toBeFalsy();
    expect(validator.errors).toMatchObject({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });
  });
});

describe("Update Category Validator", () => {
  it("should return true if an empty object is passed", () => {
    const payload = {};
    const validator = new UpdateCategoryValidator();

    expect(validator).toBeInstanceOf(UpdateCategoryValidator);
    expect(validator.validate(payload)).toBeTruthy();
  });

  it("should return true if valid fields are passed", () => {
    const fullPayload = {
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: new Date(),
    };
    const entries = Object.entries(fullPayload);

    let payload = {} as any;
    for (const [key, value] of entries) {
      payload = { ...payload, [key]: value };
      const validator = new UpdateCategoryValidator();
      expect(validator).toBeInstanceOf(UpdateCategoryValidator);
      expect(validator.validate(payload)).toBeTruthy();
    }
  });

  it("should return false if name is invalid", () => {
    const payload = { name: 123 } as any;
    const validator = new UpdateCategoryValidator();

    expect(validator).toBeInstanceOf(UpdateCategoryValidator);
    expect(validator.validate(payload)).toBeFalsy();
    expect(validator.errors).toMatchObject({
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    });
  });
});
