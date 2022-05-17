import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly secondName: string;
  @ApiProperty()
  readonly phone: string;
}
