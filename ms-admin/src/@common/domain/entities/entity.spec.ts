import * as uuid from "uuid";
import { Entity } from "./entity";
import { UniqueEntityId } from "../value-objects/unique-entity.id.vo";

type StubProps = {
  prop1: string;
  prop2: Date;
};

class Stub extends Entity<StubProps> {}

describe("Entity", () => {
  const props = {
    prop1: "value1",
    prop2: new Date(),
  };

  it("should set props and id", () => {
    const entity = new Stub(props);

    expect(entity.props).toStrictEqual(props);
    expect(uuid.validate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const validId = "ec147f4a-8794-4472-b45c-98c87f10658f";
    const entity = new Stub(props, new UniqueEntityId(validId));

    expect(entity.props).toStrictEqual(props);
    expect(entity.id).toBe(validId);
    expect(uuid.validate(entity.id)).toBeTruthy();
  });
});
