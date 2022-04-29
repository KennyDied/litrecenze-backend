export class CreateAuthorDto {
  readonly firstName: string;
  readonly middleName?: string;
  readonly lastName: string;
  readonly dateOfBirth: string;
  readonly dateOfDeath?: string;
  readonly description?: string;
}
