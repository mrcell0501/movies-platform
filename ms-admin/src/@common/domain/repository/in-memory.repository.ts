import { NotFoundError } from "../../errors/not-found.error";
import { Entity } from "../entities/entity";
import { UniqueEntityId } from "../value-objects/unique-entity.id.vo";
import { Repository, SearchableRepository } from "./repository.contract";

export abstract class InMemoryRepository<E extends Entity>
  implements Repository<E>
{
  private items: E[] = [];

  async delete(id: string | UniqueEntityId): Promise<void> {
    const foundItem = this._findById(String(id));
    this.items = this.items.filter((item) => item.id !== foundItem.id);
  }
  async findById(id: string | UniqueEntityId): Promise<E> {
    return this._findById(String(id));
  }

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async update(entity: E): Promise<void> {
    this._findById(entity.id);

    const index = this.items.findIndex((item) => item.id === entity.id);
    this.items[index] = entity;
  }

  private _findById(id: string): E {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundError(`entity not found with id ${id}`);
    }

    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepository<E, any, any>
{
  search(props: any): Promise<SearchResult> {
    throw new Error("Method not implemented.");
  }
}
