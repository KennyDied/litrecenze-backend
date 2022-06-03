import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly middleName?: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly dateOfBirth: string;
  @ApiProperty()
  readonly dateOfDeath?: string;
  @ApiProperty()
  readonly description?: string;
}
