import { NotFoundError } from "../../errors/not-found.error";
import { Entity } from "../entities/entity";
import { UniqueEntityId } from "../value-objects/unique-entity.id.vo";
import { InMemoryRepository } from "./in-memory.repository";

type Props = {
  name: string;
};

class StubEntity extends Entity<Props> {}

class Stub extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository", () => {
  let repository = new Stub();

  beforeEach(() => {
    repository = new Stub();
  });

  it("should insert a new item", async () => {
    const entity = new StubEntity({ name: "Movie" });

    await repository.insert(entity);
    const found = await repository.findById(entity.id);

    expect(found).toStrictEqual(entity);
  });

  it("should throw error when entity is not found", async () => {
    await expect(repository.findById("fake-id")).rejects.toThrow(
      new NotFoundError("entity not found with id fake-id")
    );

    const uniqueEntityId = new UniqueEntityId();
    await expect(repository.findById(uniqueEntityId)).rejects.toThrow(
      new NotFoundError(`entity not found with id ${uniqueEntityId}`)
    );
  });

  it("should find entity by id", async () => {
    const entity = new StubEntity({ name: "Movie" });

    await repository.insert(entity);
    const found = await repository.findById(entity.id);

    expect(found).toStrictEqual(entity);
  });

  it("should throw error on update when entity is not found", async () => {
    const entity = new StubEntity({ name: "Movie" });

    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`entity not found with id ${entity.id}`)
    );
  });

  it("should be able to update an existing item", async () => {
    const entityId = new UniqueEntityId();
    const entity = new StubEntity({ name: "Movie" }, entityId);

    await repository.insert(entity);
    let found = await repository.findById(entityId);

    expect(found).toStrictEqual(entity);

    const updatedEntity = new StubEntity({ name: "TV Show" }, entityId);
    await repository.update(updatedEntity);
    found = await repository.findById(entityId);

    expect(found).toStrictEqual(updatedEntity);
  });

  it("should throw error on delete when entity is not found", async () => {
    const uniqueEntityId = new UniqueEntityId();

    await expect(repository.delete(uniqueEntityId)).rejects.toThrow(
      new NotFoundError(`entity not found with id ${uniqueEntityId}`)
    );
  });

  it("should be able to delete an existing item", async () => {
    const entityId = new UniqueEntityId();
    const entity = new StubEntity({ name: "Movie" }, entityId);

    await repository.insert(entity);
    const found = await repository.findById(entityId);

    expect(found).toStrictEqual(entity);

    await repository.delete(found.id);

    await expect(repository.findById(found.id)).rejects.toThrow(
      new NotFoundError(`entity not found with id ${found.id}`)
    );
  });
});
