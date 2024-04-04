export interface ValidatorFields<ValidatedProps> {
  validate(data: ValidatedProps): boolean;
  errors?: Partial<{ [key: string]: string[] }>;
  data: ValidatedProps;
}
