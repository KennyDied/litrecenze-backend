import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  readonly text: string;
  @ApiProperty()
  readonly rate: number;
  @ApiProperty()
  readonly bookId: number;
}
