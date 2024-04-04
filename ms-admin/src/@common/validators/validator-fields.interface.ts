export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidatorFields<ValidatedProps> {
  validate(data: ValidatedProps): boolean;
  errors?: FieldsErrors;
  data: ValidatedProps;
}
