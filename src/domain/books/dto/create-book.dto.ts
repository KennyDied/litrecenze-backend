import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  readonly authorId: number;
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly image?: string;
  @ApiProperty()
  readonly description?: string;
  @ApiProperty()
  readonly rate?: number;
}
