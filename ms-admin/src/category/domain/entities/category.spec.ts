import { UniqueEntityId } from "../../../@common/domain/value-objects/unique-entity.id.vo";
import { InvalidUuidError } from "../../../@common/errors/invalid-uuid.error";
import { Category } from "./category";

describe("Category Unit Tests", () => {
  beforeEach(() => {
    Category.validateCreate = jest.fn();
    Category.validateUpdate = jest.fn();
  });

  it("should be able to create a category passing only name", () => {
    const category = new Category({ name: "Movie" });

    expect(Category.validateCreate).toHaveBeenCalledTimes(1);
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

    expect(Category.validateCreate).toHaveBeenCalledTimes(1);
    expect(category.props).toStrictEqual(props);
  });

  it("should throw exception if id passed is invalid", () => {
    const invalidId = "invalid-id";

    expect(() => {
      new Category({ name: "Movie" }, new UniqueEntityId(invalidId));
    }).toThrow(new InvalidUuidError());
  });

  it("should use id as a valid uuid if passed", () => {
    const validId = "ec147f4a-8794-4472-b45c-98c87f10658f";
    const category = new Category(
      { name: "Movie" },
      new UniqueEntityId(validId)
    );

    expect(category.id).toBe(validId);
  });

  it("should update a category", () => {
    const activateSpy = jest.spyOn(Category.prototype as any, "activate");
    const deactivateSpy = jest.spyOn(Category.prototype as any, "deactivate");
    const category = new Category({ name: "Movie" });
    let updateProps = {
      name: "Movie 2",
      description: "some description",
      is_active: false,
    };

    category.update(updateProps);
    expect(Category.validateUpdate).toHaveBeenCalledTimes(1);
    expect(category.props).toMatchObject(updateProps);
    expect(deactivateSpy).toHaveBeenCalledTimes(1);

    updateProps = { ...updateProps, is_active: true };
    category.update(updateProps);
    expect(Category.validateUpdate).toHaveBeenCalledTimes(2);
    expect(category.props).toMatchObject(updateProps);
    expect(activateSpy).toHaveBeenCalledTimes(1);
  });

  it("should activate a category", () => {
    const category = new Category({ name: "Movie", is_active: false });
    category.activate();

    expect(category.props.is_active).toBeTruthy();
  });

  it("should deactivate a category", () => {
    const category = new Category({ name: "Movie", is_active: true });
    category.deactivate();

    expect(category.props.is_active).toBeFalsy();
  });
});
