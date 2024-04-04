import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ClassValidatorFields } from "../../../@common/validators/class-validator-fields";
import { PartialType } from "@nestjs/mapped-types";

class CreateCategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  constructor(data: CreateCategoryRules) {
    Object.assign(this, data);
  }
}

class UpdateCategoryRules extends PartialType(CreateCategoryRules) {
  constructor(data: UpdateCategoryRules) {
    super();
    Object.assign(this, data);
  }
}

export class CreateCategoryValidator extends ClassValidatorFields<CreateCategoryRules> {
  validate(data: CreateCategoryRules): boolean {
    return super.validate(new CreateCategoryRules(data));
  }
}

export class UpdateCategoryValidator extends ClassValidatorFields<UpdateCategoryRules> {
  validate(data: UpdateCategoryRules): boolean {
    return super.validate(new UpdateCategoryRules(data));
  }
}
