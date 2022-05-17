import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly passwordHash: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly secondName: string;
  
  @ApiProperty()
  readonly phone?: string;
}
