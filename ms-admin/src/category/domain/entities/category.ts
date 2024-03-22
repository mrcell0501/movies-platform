import { Entity } from "../../../@common/domain/entities/entity";
import { UniqueEntityId } from "../../../@common/domain/value-objects/unique-entity.id.vo";

type Props = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<Props> {
  constructor(public readonly props: Props, id?: UniqueEntityId) {
    super(props, id);

    this.props.description = props.description ?? null;
    this.props.is_active = props.is_active ?? true;
    this.props.created_at = props.created_at ?? new Date();
  }

  update(props: Partial<Props>) {
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
