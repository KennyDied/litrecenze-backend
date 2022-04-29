import { Controller, Get, Request, UseInterceptors } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { HowIAmInterceptor } from '../interceptors/how-i-am.interceptor';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @UseInterceptors(HowIAmInterceptor)
  @Get()
  async me(@Request() req) {

  }
}
