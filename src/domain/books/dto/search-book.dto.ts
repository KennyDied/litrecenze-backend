import { ApiProperty } from '@nestjs/swagger';

export class SearchBookDto {
  @ApiProperty()
  readonly authorId?: number;
  @ApiProperty()
  readonly title?: string;
  @ApiProperty()
  readonly rate?: number;
}
