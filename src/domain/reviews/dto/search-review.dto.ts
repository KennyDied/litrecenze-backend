import { ApiProperty } from '@nestjs/swagger';

export class SearchReviewDto {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  author?: string;
}
