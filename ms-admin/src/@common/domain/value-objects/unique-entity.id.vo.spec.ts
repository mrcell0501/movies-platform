import { InvalidUuidError } from "../../errors/invalid-uuid.error";
import { UniqueEntityId } from "./unique-entity.id.vo";

describe("UniqueEntityId", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake-id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should accept a valid uuid", () => {
    const validId = "ec147f4a-8794-4472-b45c-98c87f10658f";
    const id = new UniqueEntityId(validId);

    expect(id.value).toBe(validId);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
