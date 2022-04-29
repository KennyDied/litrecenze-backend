import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  async getAll() {
    return await this.reviewsService.getAll();
  }

  @Post()
  async createReview(@Request() req, @Body() dto: CreateReviewDto) {
    return await this.reviewsService.create(req.user, dto);
  }
}
