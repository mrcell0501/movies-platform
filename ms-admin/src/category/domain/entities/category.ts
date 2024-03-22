import { UniqueEntityId } from "../../../@common/domain/value-objects/unique-entity.id.vo";

type Props = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category {
  private readonly _id: UniqueEntityId;
  constructor(private readonly _props: Props, id?: string) {
    this._id = new UniqueEntityId(id);
    this._props.description = _props.description ?? null;
    this._props.is_active = _props.is_active ?? true;
    this._props.created_at = _props.created_at ?? new Date();
  }

  public get id(): string {
    return this._id.value;
  }

  public get props() {
    return this._props;
  }

  // get name() {
  //   return this.props.name;
  // }

  // get description() {
  //   return this.props.description;
  // }

  // get is_active() {
  //   return this.props.is_active;
  // }

  // get created_at() {
  //   return this.props.created_at;
  // }

  // async create(cmd: CreateCategoryCmd): Promise<Category> {
  //   const category =  new Category({
  //     name:
  //   }

  //   return category
  // }
}
