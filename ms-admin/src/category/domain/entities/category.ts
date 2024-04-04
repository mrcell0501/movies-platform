import { Entity } from "../../../@common/domain/entities/entity";
import { UniqueEntityId } from "../../../@common/domain/value-objects/unique-entity.id.vo";
import {
  CreateCategoryValidator,
  UpdateCategoryValidator,
} from "../validators/category.validator";

type Props = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<Props> {
  constructor(public readonly props: Props, id?: UniqueEntityId) {
    Category.validateCreate(props);
    super(props, id);
    this.props.description = props.description ?? null;
    this.props.is_active = props.is_active ?? true;
    this.props.created_at = props.created_at ?? new Date();
  }

  static validateCreate(props: Omit<Props, "created_at">): void {
    new CreateCategoryValidator().validate(props);
  }

  static validateUpdate(props: Partial<Omit<Props, "created_at">>): void {
    new UpdateCategoryValidator().validate(props);
  }

  update(props: Partial<Omit<Props, "created_at">>): void {
    Category.validateUpdate(props);
    this.props.name = props.name ?? this.props.name;
    this.props.description = props.description ?? this.props.description;

    if (props.is_active === true) {
      this.activate();
    } else if (props.is_active === false) {
      this.deactivate();
    }
  }

  activate(): void {
    this.props.is_active = true;
  }

  deactivate(): void {
    this.props.is_active = false;
  }
}
