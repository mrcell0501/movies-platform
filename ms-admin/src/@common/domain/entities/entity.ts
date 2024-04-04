import { UniqueEntityId } from "../value-objects/unique-entity.id.vo";

export abstract class Entity<Props = unknown> {
  private readonly _id: UniqueEntityId;

  constructor(public readonly props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId();
  }

  get id(): string {
    return this._id.value;
  }

  toJSON(): { id: string } & Props {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
