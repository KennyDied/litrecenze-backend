import { Controller, Get, Request, UseInterceptors } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  async me(@Request() req) {

  }
}
