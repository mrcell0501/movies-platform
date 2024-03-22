import { InvalidUuidError } from "../../../@common/errors/invalid-uuid.error";
import { Category } from "./category";

describe("Category constructor", () => {
  it("should be able to create a category passing only name", () => {
    const category = new Category({ name: "Movie" });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
      created_at: expect.any(Date),
    });
  });

  it("should be able to create a category passing all fields", () => {
    const props = {
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at: new Date(),
    };
    const category = new Category(props);

    expect(category.props).toStrictEqual(props);
  });

  it("should throw exception if id passed is invalid", () => {
    const invalidId = "invalid-id";

    expect(() => {
      new Category({ name: "Movie" }, invalidId);
    }).toThrow(new InvalidUuidError());
  });

  it("should use id as a valid uuid if passed", () => {
    const validId = "ec147f4a-8794-4472-b45c-98c87f10658f";
    const category = new Category({ name: "Movie" }, validId);

    expect(category.id).toBe(validId);
  });
});
